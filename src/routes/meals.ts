import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      is_on_the_diet: z.boolean(),
    })

    const { name, description, date, is_on_the_diet } = bodySchema.parse(
      request.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      date: date.getTime(),
      user_id: request.user.id,
      name,
      description,
      is_on_the_diet,
    })

    return reply.status(201).send()
  })

  app.get('/', async (request) => {
    const meals = await knex('meals').where({
      user_id: request.user.id,
    })

    return { meals }
  })

  app.get('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const meal = await knex('meals')
      .select()
      .where({ user_id: request.user.id, id })
      .first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    return { meal }
  })

  app.delete('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const meal = await knex('meals')
      .select()
      .where({ user_id: request.user.id, id })
      .first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    await knex('meals').delete().where({ id })

    return reply.status(204).send()
  })

  app.put('/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      is_on_the_diet: z.boolean().optional(),
    })

    const { id } = paramsSchema.parse(request.params)
    const { name, description, date, is_on_the_diet } = bodySchema.parse(
      request.body,
    )

    const meal = await knex('meals')
      .select()
      .where({ user_id: request.user.id, id })
      .first()

    if (!meal) {
      return reply.status(404).send({
        message: 'Meal not found',
      })
    }

    await knex('meals').update({
      name,
      description,
      date: date ? date.getTime() : undefined,
      is_on_the_diet,
    })

    return reply.status(204).send()
  })

  app.get('/metrics', async (request) => {
    const meals = await knex('meals')
      .where({
        user_id: request.user.id,
      })
      .orderBy('date', 'desc')

    const metrics = {
      total_meals: meals.length,
      meals_on_the_diet: 0,
      meals_off_the_diet: 0,
      best_streak: 0,
    }

    let currentStreak = 0
    meals.forEach((meal) => {
      if (meal.is_on_the_diet) {
        metrics.meals_on_the_diet += 1
        currentStreak += 1
        if (currentStreak > metrics.best_streak) {
          metrics.best_streak = currentStreak
        }
      } else {
        metrics.meals_off_the_diet += 1
        currentStreak = 0
      }
    })

    return { metrics }
  })
}
