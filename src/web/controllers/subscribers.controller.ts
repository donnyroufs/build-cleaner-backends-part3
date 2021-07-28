import { Request, Response } from 'express'
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
} from 'inversify-express-utils'
import { SubscribersService } from '@logic/services/subscribers.service'
import {
  CreateSubscriberDto,
  GetOneSubscriberDto,
  UpdateSubscriberDto,
} from '@logic/dtos'
import { ValidateRequestMiddleware } from '@web/middlewares/validate-request.middleware'
import { BaseHttpResponse } from '@web/lib/base-http-response'

@controller('/subscribers')
export class SubscribersController {
  constructor(private readonly _service: SubscribersService) {}

  @httpGet('/')
  async index(req: Request, res: Response) {
    const subscribers = await this._service.all()

    const response = BaseHttpResponse.success(subscribers)
    res.json(response)
  }

  @httpGet('/:id', ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async show(req: Request, res: Response) {
    const subscriber = await this._service.findOne(req.body)

    const response = BaseHttpResponse.success(subscriber)
    res.json(response)
  }

  @httpPost('/', ValidateRequestMiddleware.with(CreateSubscriberDto))
  async store(req: Request, res: Response) {
    const subscriber = await this._service.create(req.body)

    const response = BaseHttpResponse.success(subscriber, 201)
    res.status(response.statusCode).json(response)
  }

  @httpPatch('/:id', ValidateRequestMiddleware.withParams(UpdateSubscriberDto))
  async update(req: Request, res: Response) {
    await this._service.updateOne(req.body)

    const response = BaseHttpResponse.success({}, 200)

    res.status(response.statusCode).json(response)
  }

  @httpDelete('/:id', ValidateRequestMiddleware.withParams(GetOneSubscriberDto))
  async destroy(req: Request, res: Response) {
    await this._service.deleteOne(req.body)

    const response = BaseHttpResponse.success({}, 200)

    res.status(response.statusCode).json(response)
  }
}
