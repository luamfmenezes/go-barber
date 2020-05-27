import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import bodyParser from 'body-parser';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import raterLimiter from '@shared/infra/http/middlewares/rateLimiter';
import path from 'path';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(raterLimiter);

app.use(bodyParser.json());

// rewrite luam
const filesFolder = path.resolve(
    __dirname,
    '../',
    '../',
    '../',
    '../',
    'tmp',
    'uploads',
);
app.use('/files', express.static(filesFolder));

app.use(routes);

app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                messsage: err.message,
            });
        }

        console.error(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    console.log('🐱‍👤 Server started on port 3333');
});
