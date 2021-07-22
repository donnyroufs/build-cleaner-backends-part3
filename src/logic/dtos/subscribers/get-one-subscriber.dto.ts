export class GetOneSubscriberDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<GetOneSubscriberDto>) {
    if (!body.id) {
      throw new Error('missing id property')
    }

    return new GetOneSubscriberDto(body.id)
  }
}
