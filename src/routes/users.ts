import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    })

    let { name, email, password, confirmPassword } = bodySchema.parse(
      request.body,
    )

    if (password !== confirmPassword) {
      return reply.status(400).send({
        message: 'Passwords do not match',
      })
    }

    const userAlreadyExists = await knex('users')
      .select()
      .where({ email })
      .first()

    if (userAlreadyExists) {
      return reply.status(400).send({
        message: 'User already exists',
      })
    }

    password = await app.bcrypt.hash(password)

    await knex('users').insert({
      id: randomUUID(),
      email,
      name,
      password,
    })

    return reply.status(201).send()
  })

  app.post('/auth', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await knex('users').select().where({ email }).first()

    if (!user) {
      return reply.status(400).send({
        message: 'User not found',
      })
    }

    const passwordMatch = await app.bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return reply.status(400).send({
        message: 'Incorrect password',
      })
    }

    const token = app.jwt.sign({
      id: user.id,
    })

    return reply.status(200).send({
      token,
    })
  })
}
