import { Host } from './host.type.js';
import { Goods } from './goods.type.js';
import { Images } from './images.type.js';

export type Offer = {
  bedrooms: number;
  city: string;
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
  type: string;
  createdDate: Date;
  host: Host
}
