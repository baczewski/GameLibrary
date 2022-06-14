import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('game_categories', (table) => {
        table.increments('id').primary();
        table.integer('game_id').references('id').inTable('games')
            .notNullable().onDelete('CASCADE');
        table.integer('category_id').references('id').inTable('categories')
            .notNullable().onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

        table.unique(['game_id', 'category_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('game_categories');
}