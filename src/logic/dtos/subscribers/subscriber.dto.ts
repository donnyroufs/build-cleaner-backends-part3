import { ISubscriber } from '@data/subscribers.model'

export class SubscriberDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly channel: string,
    public readonly createdAt: Date
  ) {}

  static from(entity: ISubscriber) {
    return new SubscriberDto(
      entity._id,
      entity.name,
      entity.channel,
      entity.createdAt
    )
  }

  static fromMany(subscribers: ISubscriber[]) {
    return subscribers.map((subscriber) => SubscriberDto.from(subscriber))
  }
}
