import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('games', (table) => 
            table.text('name').unique().alter())
        .alterTable('users', (table) => 
            table.text('name').unique().alter());
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('games', (table) => 
            table.dropUnique(['name']))
        .alterTable('users', (table) =>
            table.dropUnique(['name']));
}