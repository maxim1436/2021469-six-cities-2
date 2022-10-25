import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT} from './offer.constant.js';
import {SortType} from '../../types/sort-type.enum.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['hostId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    return this.offerModel
      .find({}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['hostId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['hostId'])
      .exec();
  }

  public async findPremiumForCity(cityName: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? PREMIUM_OFFER_COUNT;

    return this.offerModel
      .find({city: cityName}, {}, {limit})
      .sort({createdAt: SortType.Down})
      .populate(['hostId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string, commentRating: number): Promise<DocumentType<OfferEntity> | null> {
    const offer = this.offerModel.findById(offerId);

    if (offer.commentCount) {
      const newRating = (offer.rating * offer.commentCount + commentRating) / (offer.commentCount + 1).toFixed(1);
      return this.offerModel
        .findByIdAndUpdate(offerId, {'$inc': {
          commentCount: 1,
        }})
        .findByIdAndUpdate(offerId, {rating: newRating})
        .exec();
    } else {
      const newRating = (offer.rating + commentRating).toFixed(1);
      return this.offerModel
        .findByIdAndUpdate(offerId, {'$inc': {
          commentCount: 1,
        }})
        .findByIdAndUpdate(offerId, {rating: newRating})
        .exec();
    }
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true})
      .populate(['hostId'])
      .exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(count)
      .populate(['userId', 'categories'])
      .exec();
  }

}
