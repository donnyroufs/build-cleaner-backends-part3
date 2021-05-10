import 'dotenv/config'
import 'reflect-metadata'
import { App } from './web/application'

import './web/controllers/subscribers.controller'

console.clear()

export async function bootstrap() {
  new App().setup()
}

bootstrap()
