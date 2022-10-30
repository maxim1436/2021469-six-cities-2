import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import OfferGetResponse from './response/offer-get.response.js';
import OfferPostResponse from './response/offer-post.response.js';
import {fillDTO} from '../../utils/common.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import * as core from 'express-serve-static-core';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {RequestQuery} from '../../types/request-query.type.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';

type ParamsGetOffer = {
  offerId: string;
  cityName: string;
  isFavorite: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({path: '/premium/:cityName', method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({path: '/bundles/favorite', method: HttpMethod.Get, handler: this.getFavoriteOffers});
    this.addRoute({path: '/bundles/favorite/:offerId/:isFavorite', method: HttpMethod.Get, handler: this.addOrRemoveToFavorite});
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findByDefault();
    const offerResponse = fillDTO(OfferGetResponse, offers);
    this.ok(res, offerResponse);
  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferGetResponse, offer));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(
      res,
      fillDTO(OfferPostResponse, offer)
    );
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId);

    this.noContent(res, offer);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferPostResponse, updatedOffer));
  }

  public async getPremiumOffers(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findPremiumForCity(params.cityName);
    this.ok(res, fillDTO(OfferGetResponse, offers));
  }

  public async getFavoriteOffers(
    _req: Request, res: Response
  ):Promise<void> {
    const offers = await this.offerService.findFavorites();
    this.ok(res, fillDTO(OfferGetResponse, offers));
  }

  public async addOrRemoveToFavorite(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    if (params.isFavorite === '1') {
      const offers = await this.offerService.updateById(params.offerId, {isFavorite: true});
      this.ok(res, fillDTO(OfferGetResponse, offers));
    } else {
      const offers = await this.offerService.updateById(params.offerId, {isFavorite: false});
      this.ok(res, fillDTO(OfferGetResponse, offers));
    }
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
