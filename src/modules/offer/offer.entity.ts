import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';
import {HostEntity} from '../host/host.entity.js';
import {City} from '../../types/city.enum.js';
import  {Goods} from '../../types/goods.type.js';
import {Images} from '../../types/images.type.js';
import { RoomType } from '../../types/room-type.enum.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, min: [1, 'Min bedrooms can be 1'], max: [8, 'Max bedrooms can be 8']})
  public bedrooms!: number;

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({required: true, minlength: [20, 'Min length for description is 20'], maxlength: [1024, 'Max length for description is 1024']})
  public description!: string;

  @prop({
    required: true,
    default: [],
    _id: false
  })
  public goods!: Goods[];

  @prop({
    required: true,
    default: [],
    _id: false
  })
  public images!: Images[];

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public latitude!: number;

  @prop({required: true})
  public longitude!: number;

  @prop({required: true, min: [1, 'Min adults can be 1'], max: [10, 'Max adults can be 10']})
  public maxAdults!: number;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true, min: [100, 'Min price can be 100'], max: [100000, 'Max price can be 100000']})
  public price!: number;

  @prop({required: true, min: [1, 'Min rating can be 1'], max: [5, 'Max rating can be 5']})
  public rating!: number;

  @prop({required: true, minlength: [10, 'Min length for title is 10'], maxlength: [100, 'Max length for title is 100']})
  public title!: string;

  @prop({
    required: true,
    type: () => String,
    enum: RoomType
  })
  public type!: RoomType;

  @prop({required: true})
  public createdDate!: Date;

  @prop({
    ref: HostEntity,
    required: true
  })
  public hostId!: Ref<HostEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
