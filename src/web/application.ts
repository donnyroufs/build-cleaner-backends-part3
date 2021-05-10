import express from 'express'

import { InversifyExpressServer } from 'inversify-express-utils'

import { DBService } from '../data/db.service'
import { container } from '../di-container'
import { Application } from './lib/abstract-application'

export class App extends Application {
  async setup() {
    const _db = container.get(DBService)

    await _db.connect()

    const server = new InversifyExpressServer(container)

    server.setConfig((app) => {
      app.use(express.json())
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on http://localhost:${process.env.PORT}/subscribers`
      )
    })
  }
}
