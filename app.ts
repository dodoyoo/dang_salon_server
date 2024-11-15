import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import favicon from 'serve-favicon';
import path from 'path';
import userRouter from './src/domain/user/userRoute';
import storeRouter from './src/domain/store/storeRoute';
import reservationRouter from './src/domain/reservation/reservationRoute';
import reviewRouter from './src/domain/review/reviewRoute';
import commentRouter from './src/domain/comment/commentRoute';

export const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: 'https://www.dangsalon.com',
    })
  );
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(userRouter);
  app.use(storeRouter);
  app.use(reservationRouter);
  app.use(reviewRouter);
  app.use(commentRouter);

  app.post('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pongggg' });
  });
  // app.get('/', (req: Request, res: Response) => {
  //     res.send(`
  //         <h1>Log in<h1>
  //         <a href="/login">Log in</a>`);
  // });
  return app;
};
