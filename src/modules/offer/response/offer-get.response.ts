import {Expose} from 'class-transformer';

export default class OfferGetResponse {
  @Expose()
  public price!: number;

  @Expose()
  public title!: string;

  @Expose()
  public type!: string;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: boolean;
}
