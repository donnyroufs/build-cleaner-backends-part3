import { injectable } from 'inversify'
import { SubscribersRepository } from '@data/subscribers.repository'
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  SubscriberDto,
  UpdateSubscriberDto,
} from '@logic/dtos'
import { CouldNotFindSubscriberException } from '@logic/exceptions'

@injectable()
export class SubscribersService {
  constructor(private readonly _subscribersRepo: SubscribersRepository) {}

  async all() {
    const subscribers = await this._subscribersRepo.all()
    return SubscriberDto.fromMany(subscribers)
  }

  async findOne(getOneSubscriberDto: GetOneSubscriberDto) {
    const foundSubscriber = await this._subscribersRepo.findOne(
      getOneSubscriberDto.id
    )

    if (!foundSubscriber) {
      throw new CouldNotFindSubscriberException()
    }

    return SubscriberDto.from(foundSubscriber)
  }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const createdSubscriber = await this._subscribersRepo.create(
      createSubscriberDto
    )
    return SubscriberDto.from(createdSubscriber)
  }

  async updateOne(updateSubscriberDto: UpdateSubscriberDto) {
    // TODO: Implement proper mapping?
    return this._subscribersRepo.updateOne({
      _id: updateSubscriberDto.id,
      channel: updateSubscriberDto.channel,
      name: updateSubscriberDto.name,
    })
  }

  async deleteOne({ id }: GetOneSubscriberDto) {
    await this._subscribersRepo.deleteOne(id)

    return true
  }
}
