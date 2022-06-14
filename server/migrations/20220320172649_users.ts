import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.text('password').notNullable();
        table.text('age').notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('users');
}
