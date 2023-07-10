import { app } from './app'

app
  .listen({ port: 3000 })
  .then(() => console.log(`Server running on port`))
  .catch((err) => console.error(err.message))
