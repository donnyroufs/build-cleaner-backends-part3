export class CouldNotFindSubscriberException extends Error {
  constructor() {
    super('Missing subscriber')
  }
}
