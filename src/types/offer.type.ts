import { Host } from './host.type.js';
import { Goods } from './goods.type.js';
import { Images } from './images.type.js';
import { City } from './city.enum.js';
import { RoomType } from './room-type.enum.js';

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: Goods[];
  images: Images[];
  isFavorite: boolean;
  isPremium: boolean;
  latitude: number;
  longitude: number;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: RoomType;
  createdDate: Date;
  host: Host
}
