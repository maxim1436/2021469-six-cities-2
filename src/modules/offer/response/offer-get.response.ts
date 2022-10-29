import {Expose, Type} from 'class-transformer';
import HostResponse from '../../host/response/host.response.js';

export default class OfferGetResponse {
  @Expose()
  public bedrooms!: number;

  @Expose()
  public city!: string;

  @Expose()
  public description!: string;

  @Expose()
  public goods!: string[];

  @Expose()
  public images!: string[];

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public price!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;

  @Expose()
  public title!: string;

  @Expose()
  public type!: string;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public previewImage!: string;

  @Expose()
  public rating!: number;

  @Expose()
  public commentCount!: number;

  @Expose({ name: 'hostId'})
  @Type(() => HostResponse)
  public host!: HostResponse;
}
