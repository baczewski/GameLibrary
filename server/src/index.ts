import Knex from "knex";
import { Model } from "objection";
import knexConfig from "../knexfile";
import CategoryService from "./services/category-service";
import CommentService from "./services/comment-service";
import GameService from "./services/game-service";
import RankingService from "./services/ranking-service";
import UserService from "./services/user-service";

async function registerUser(name: string, password: string, age: number) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const user = await UserService.register(name, password, age);
        console.log(user);
    }
    finally{
       await knexClient.destroy();
    }
}

async function loginUser(name: string, password: string) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const user = await UserService.login({ name, password });
    } finally {
        await knexClient.destroy();
    }
}

async function createGame(name: string, minAge: number, userId: number) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        // const game = await GameService.createGame({name, minAge}, userId);
        // console.log(game);
    } finally {
        await knexClient.destroy();
    }
}

async function addCommentToGame(comment: string, rating: number, userId: number, gameId: number) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        // const result = await CommentService.addComment(comment, rating, userId, gameId);
        // console.log(result);
    } finally {
        await knexClient.destroy();
    }
}

async function removeComment(commentId: number) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const result = await CommentService.deleteCommentById(commentId);
        console.log(result);
    } finally {
        await knexClient.destroy();
    }
}

async function addCategory(category: string) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const result = await CategoryService.addCategory(category);
        console.log(result);

    } finally {
        await knexClient.destroy();
    }
}

async function addGameToCategory(gameId: number, categoryId: number) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const result = await CategoryService.addGameToCategory(gameId, categoryId);
        console.log(result);

    } finally {
        await knexClient.destroy();
    }
}
async function getAllCategories() {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const result = await CategoryService.listAll();
        console.log(result);

    } finally {
        await knexClient.destroy();
    }
}


async function addRanking(name: string) {
    const knexClient = Knex(knexConfig.development);
    Model.knex(knexClient as any);

    try {
        const result = await RankingService.addRanking(name);
        console.log(result);

    } finally {
        await knexClient.destroy();
    }
}

registerUser('admin', '123123', 22);
// loginUser('ss', '123');
// createGame('Monopoly', 7, 1);
// createGame('Scrabble', 10, 2);
// addCommentToGame('That is a nice game', 9.5, 1, 1);
// addCommentToGame('That sucks', 0, 2, 1);
// removeComment(2);
// addCategory('family game');
// addGameToCategory(3, 3);
// addRanking('Top 10');
// getAllCategories();