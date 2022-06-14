import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('users', (table) => 
            table.integer('age').checkPositive('check_age').alter())
        .alterTable('games', (table) => 
            table.integer('min_age').checkBetween([0, 20], 'check_min_age').alter());
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema
        .alterTable('users', (table) => 
            table.dropChecks('check_age'))
        .alterTable('games', (table) => 
            table.dropChecks('check_min_age'));
}