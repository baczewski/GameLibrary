import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('game_rankings', (table) => {
        table.increments('id').primary();
        table.integer('game_id').references('id').inTable('games')
            .notNullable().onDelete('CASCADE');
        table.integer('ranking_id').references('id').inTable('rankings')
            .notNullable().onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    
        table.unique(['game_id', 'ranking_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('game_rankings');
}