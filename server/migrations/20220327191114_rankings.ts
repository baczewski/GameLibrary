import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('rankings', (table) => {
        table.increments('id').primary();
        table.text('name').notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

        table.unique(['name']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('rankings');
}