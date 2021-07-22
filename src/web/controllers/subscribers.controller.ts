import { Request, Response } from 'express'
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
} from 'inversify-express-utils'
import { SubscribersService } from '@logic/subscribers.service'
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  UpdateSubscriberDto,
} from '@logic/dtos'
import { ValidateRequestMiddleware } from '@web/middlewares/validate-request.middleware'

@controller('/subscribers')
export class SubscribersController {
  constructor(private readonly _service: SubscribersService) {}

  @httpGet('/')
  async index(req: Request, res: Response) {
    const subscribers = await this._service.all()

    res.json({
      data: {
        subscribers,
      },
    })
  }

  @httpGet('/:id', ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async show(req: Request, res: Response) {
    const subscriber = await this._service.findOne(req.body)

    res.json({
      data: {
        subscriber,
      },
    })
  }

  @httpPost('/', ValidateRequestMiddleware.with(CreateSubscriberDto))
  async store(req: Request, res: Response) {
    const subscriber = await this._service.create(req.body)

    res.status(201).json({
      data: {
        subscriber,
      },
    })
  }

  @httpPatch('/:id', ValidateRequestMiddleware.withParams(UpdateSubscriberDto))
  async update(req: Request, res: Response) {
    const updatedSubscriber = await this._service.updateOne(req.body)

    res.json({
      data: {
        subscriber: updatedSubscriber,
      },
    })
  }

  @httpDelete('/:id', ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async destroy(req: Request, res: Response) {
    await this._service.deleteOne(req.body)

    res.sendStatus(204)
  }
}
