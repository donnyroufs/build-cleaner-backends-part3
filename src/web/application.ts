import express from 'express'

import { InversifyExpressServer } from 'inversify-express-utils'

import { DBContext } from '@data/db.context'
import {
  Application,
  IAbstractApplicationOptions,
  MorganMode,
} from '@web/lib/abstract-application'
import { Container } from 'inversify'
import { SubscribersRepository } from '@data/subscribers.repository'
import { SubscribersService } from '@logic/services/subscribers.service'

import '@web/controllers/subscribers.controller'
import {
  CouldNotFindSubscriberException,
  ValidationException,
} from '@logic/exceptions'
import { BaseHttpResponse } from './lib/base-http-response'
import morgan from 'morgan'

export class App extends Application {
  constructor() {
    super({
      containerOpts: {
        defaultScope: 'Singleton',
      },
      morgan: {
        mode: MorganMode.DEV,
      },
    })
  }

  configureServices(container: Container): void {
    container.bind(DBContext).toSelf()
    container.bind(SubscribersRepository).toSelf()
    container.bind(SubscribersService).toSelf()
  }

  async setup(options: IAbstractApplicationOptions) {
    const _db = this.container.get(DBContext)

    await _db.connect()

    const server = new InversifyExpressServer(this.container)

    server.setErrorConfig((app) => {
      app.use((err, req, res, next) => {
        if (err instanceof ValidationException) {
          // NOTE: Fixed this after the video, should 've been 422!
          const response = BaseHttpResponse.failed(err.message, 422)
          return res.status(response.statusCode).json(response)
        }

        if (err instanceof CouldNotFindSubscriberException) {
          const response = BaseHttpResponse.failed(err.message, 404)
          return res.status(response.statusCode).json(response)
        }

        if (err instanceof Error) {
          const response = BaseHttpResponse.failed(err.message, 500)
          return res.status(response.statusCode).json(response)
        }

        next()
      })
    })

    server.setConfig((app) => {
      app.use(express.json())
      app.use(morgan(options.morgan.mode))
    })

    const app = server.build()

    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on http://localhost:${process.env.PORT}/subscribers`
      )
    })
  }
}

new App()
