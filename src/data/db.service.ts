import { injectable } from 'inversify'
import mongoose from 'mongoose'

import { subscribersModel } from './subscribers.model'

@injectable()
export class DBService {
  private _db: typeof mongoose

  async connect() {
    this._db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('connected to DB')
  }

  get subscriber() {
    return this._db.model('Subscriber', subscribersModel)
  }
}
