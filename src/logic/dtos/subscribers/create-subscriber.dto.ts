import { ValidationException } from '@logic/exceptions'

export class CreateSubscriberDto {
  constructor(public readonly name: string, public readonly channel: string) {}

  static from(body: Partial<CreateSubscriberDto>) {
    if (!body.channel) {
      throw new ValidationException('Missing property channel')
    }

    if (!body.name) {
      throw new ValidationException('Missing property name')
    }

    return new CreateSubscriberDto(body.name, body.channel)
  }
}
