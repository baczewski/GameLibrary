import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { config } from '../config';
import knexConfig from '../knexfile';
import categoriesRouter from './routes/categories';
import gamesRouter from './routes/games';
import loginRouter from './routes/login';
import rankingsRouter from './routes/rankings';
import userRouter from './routes/users';

import cors from 'cors';
import gameCategoriesRouter from './routes/game-categories';
import commentsRouter from './routes/comments';
import registerRouter from './routes/register';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient as any);

const app = express();

app.use(cors());
app.use(json());

app.use('/games', gamesRouter);

app.use('/categories', categoriesRouter);

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/rankings', rankingsRouter);

app.use('/users', userRouter);

app.use('/game-categories', gameCategoriesRouter);

app.use('/comments', commentsRouter);

app.use('/', (request, response) => {
    response.status(200).send('Hello');
});

const port = config.get('server.port');
app.listen(port);

console.log(`Listening on port ${port}.`);