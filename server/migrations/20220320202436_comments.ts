import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.text('comment').notNullable();
        table.double('rating', 1).notNullable();
        table.integer('user_id').references('id').inTable('users')
            .notNullable().onDelete('CASCADE');
        table.integer('game_id').references('id').inTable('games')
            .notNullable().onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('comments');
}