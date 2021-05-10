import { injectable } from 'inversify'
import { DBService } from './db.service'

@injectable()
export class SubscribersRepository {
  constructor(private readonly _dbContext: DBService) {}

  async all() {
    return this._dbContext.subscriber.find({})
  }

  async findOne(id: string) {
    return this._dbContext.subscriber.findById(id)
  }

  async create({
    name,
    subscribedToChannel,
  }: {
    name: string
    subscribedToChannel: string
  }) {
    return this._dbContext.subscriber.create({ name, subscribedToChannel })
  }

  async updateOne(subscriber: any, payload: any) {
    subscriber.name = payload.name
    subscriber.subcribedToChannel = payload.subscribedToChannel

    return subscriber.save()
  }

  async deleteOne(id: string) {
    return this._dbContext.subscriber.deleteOne({ _id: id })
  }
}
