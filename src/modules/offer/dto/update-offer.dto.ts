import { City } from '../../../types/city.enum.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Goods } from '../../../types/goods.type.js';
import { Images } from '../../../types/images.type.js';

export default class UpdateOfferDto {
  public bedrooms?: number;
  public city?: City;
  public description?: string;
  public goods?: Goods[];
  public images?: Images[];
  public isFavorite?: boolean;
  public isPremium?: boolean;
  public latitude?: number;
  public longitude?: number;
  public maxAdults?: number;
  public previewImage?: string;
  public price?: number;
  public rating?: number;
  public title?: string;
  public type?: RoomType;
  public createdDate?: Date;
}
