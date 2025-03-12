import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { AppDataSource } from './src/models/dataSource';
import { createApp } from './app';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { customLogger } from './logger';
import { loggers } from 'winston';
import { error } from 'console';
const app = createApp();
const port = process.env.PORT || 4000;
const HOST = process.env.HOST;

customLogger.customedError('level called customedError');
customLogger.customedWarn('level called customedWarn');
customLogger.customedInfo('level called customedInfo');
customLogger.customedDebug('level called customedDebug');
customLogger.customedSilly('level called customedSilly');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description:
      'A simple CRUD API application made with Express and documented with Swagger',
  },
  servers: [
    {
      url: `http://${HOST}:${port}`,
    },
  ],
  basePath: '/',
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [
    './src/domain/user/*.ts',
    './src/domain/store/*.ts',
    './src/domain/review/*.ts',
    './src/domain/reservation/*.ts',
  ],
};
const swaggerSpec = swaggerJSDoc(options);

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');

      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

      app.all('*', (req: Request, res: Response, next: NextFunction) => {
        const err = new Error(`Can't find ${req.originalUrl} on this server!`);

        next(err);
      });

      app.listen(port, async () => {
        customLogger.customedInfo(`Server is running on port ${port}`);
        customLogger.customedError('This is an error message!');
        console.log(
          `Swagger docs available at http://${HOST}:${port}/api-docs`
        );
      });
    })
    .catch((error) =>
      customLogger.customedError(
        'Error during Data Source initialization:',
        error
      )
    );
})();
