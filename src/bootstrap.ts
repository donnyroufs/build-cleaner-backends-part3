import 'dotenv/config'
import 'reflect-metadata'

import { App } from '@web/application'

console.clear()

export async function bootstrap() {
  new App({
    defaultScope: 'Singleton',
  })
}

bootstrap()
