import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })

  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.string('description').notNullable()
    table.timestamp('date').notNullable()
    table.boolean('is_on_the_diet').notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('users.id')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('meals')
}
