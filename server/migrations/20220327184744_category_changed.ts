import { Knex } from "knex";
import { up as categoryUp } from './20220324192822_category';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable('categories');

    await knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();

        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

        table.unique(['name']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('categories');

    await categoryUp(knex);
}