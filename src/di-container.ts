import { Container } from 'inversify'
import { DBService } from './data/db.service'
import { SubscribersRepository } from './data/subscribers.repository'
import { SubscribersService } from './core/subscribers.service'

export const container = new Container({
  defaultScope: 'Singleton',
})

container.bind(DBService).toSelf()
container.bind(SubscribersRepository).toSelf()
container.bind(SubscribersService).toSelf()
