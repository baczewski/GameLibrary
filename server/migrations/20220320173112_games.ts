import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('games', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('min_age').notNullable();
        table.integer('user_id').references('id').inTable('users')
            .notNullable().onDelete('CASCADE');

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('games');
}