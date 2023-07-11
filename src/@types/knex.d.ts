// eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at: string
    }

    meals: {
      id: string
      description: string
      date: number
      is_on_the_diet: boolean
      user_id: string
      created_at: string
    }
  }
}
