import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import userRouter from './src/domain/user/userRoute';
import storeRouter from './src/domain/store/storeRoute';
import reservationRouter from './src/domain/reservation/reservationRoute';
import reviewRouter from './src/domain/review/reviewRoute';
import commentRouter from './src/domain/comment/commentRoute';
import favicon from 'serve-favicon';

export const createApp = () => {

  const fs = require('fs');
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use(morgan('combined'));
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'public', 'index.html')));
  app.use(express.static(path.join(__dirname, '../css/main.css')));
  app.use(express.static(path.join(__dirname, '../js/main.js')));

  app.use(userRouter);
  app.use(storeRouter);
  app.use(reservationRouter);
  app.use(reviewRouter);
  app.use(commentRouter);

  app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pongggg' });
  });

  app.get('/main', function (rea: Request, res: Response) {
    res.sendFile(path.join(__dirname, '/js/index.html'));

  // app.get('/', (req: Request, res: Response) => {
  //     res.send(`
  //         <h1>Log in<h1>
  //         <a href="/login">Log in</a>`);
  // });
  return app;
};
