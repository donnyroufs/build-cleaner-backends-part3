import { injectable } from 'inversify'
import { SubscribersRepository } from '../data/subscribers.repository'

@injectable()
export class SubscribersService {
  constructor(private readonly _subscribersRepo: SubscribersRepository) {}

  async all() {
    return this._subscribersRepo.all()
  }

  async findOne(id: string) {
    return this._subscribersRepo.findOne(id)
  }

  async create(payload: any) {
    return this._subscribersRepo.create(payload)
  }

  async updateOne(id: string, payload: any) {
    const subscriber = await this.findOne(id)

    return this._subscribersRepo.updateOne(subscriber, payload)
  }

  async deleteOne(id: string) {
    return this._subscribersRepo.deleteOne(id)
  }
}
