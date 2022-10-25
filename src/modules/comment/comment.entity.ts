import {defaultClasses} from '@typegoose/typegoose';
import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';
import {HostEntity} from '../host/host.entity.js';
import {OfferEntity} from '../offer/offer.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, minlength: [5, 'Min length for commentText is 5'], maxlength: [1024, 'Max length for commentText is 1024']})
  public commentText!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true, min: [1, 'Min rating can be 1'], max: [5, 'Max rating can be 5']})
  public rating!: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: HostEntity,
    required: true
  })
  public hostId!: Ref<HostEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
