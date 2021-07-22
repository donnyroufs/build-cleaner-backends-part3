import mongoose from 'mongoose'

export interface ISubscriber {
  _id: string
  name: string
  channel: string
  createdAt: Date
}

export const subscribersModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export type Subscriber = typeof subscribersModel
