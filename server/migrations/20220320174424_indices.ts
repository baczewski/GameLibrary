import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('users', (table) => 
            table.index('name'))
        .alterTable('games', (table) => 
            table.index('name'));
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('users', (table) => 
            table.dropIndex('name'))
        .alterTable('games', (table) => 
            table.dropIndex('name'));
}