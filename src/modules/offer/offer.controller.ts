import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import OfferGetResponse from './response/offer-get.response.js';
import OfferPostResponse from './response/offer-post.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findByDefault();
    const offerResponse = fillDTO(OfferGetResponse, offers);
    this.send(res, StatusCodes.OK, offerResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create(body);
    this.created(
      res,
      fillDTO(OfferPostResponse, result)
    );
  }
}
