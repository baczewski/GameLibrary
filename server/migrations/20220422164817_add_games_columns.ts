import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.text('description');
        table.text('imageUrl');
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('games', (table) => {
        table.dropColumns('description', 'imageUrl');
    })
}