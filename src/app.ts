import fastify from 'fastify'
import jwt from '@fastify/jwt'
import bcrypt from 'fastify-bcrypt'
import { usersRoutes } from './routes/users'
import { env } from './env'

export const app = fastify()

app.register(bcrypt, {
  saltWorkFactor: 12,
})

app.register(jwt, {
  secret: env.SECRET,
})

app.register(usersRoutes)
