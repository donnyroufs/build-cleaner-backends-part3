import { injectable } from 'inversify'
import mongoose from 'mongoose'

import { ISubscriber, subscribersModel } from '@data/subscribers.model'

@injectable()
export class DBContext {
  private _db: typeof mongoose

  async connect() {
    this._db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('connected to DB')
  }

  get subscriber() {
    return this._db.model<ISubscriber>('Subscriber', subscribersModel)
  }
}
