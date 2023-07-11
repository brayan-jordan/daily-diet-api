import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('meals', (table) => {
    table.string('name').notNullable().defaultTo('')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('meals', (table) => {
    table.dropColumn('name')
  })
}
