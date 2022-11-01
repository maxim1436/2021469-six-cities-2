import { City } from '../../../types/city.enum.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Goods } from '../../../types/goods.type.js';
import { Images } from '../../../types/images.type.js';
import {IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean} from 'class-validator';

export default class CreateOfferDto {
  @Min(1, {message: 'Minimum bedrooms is 1'})
  @Max(8, {message: 'Maximum bedrooms is 8'})
  public bedrooms!: number;

  @IsEnum(City, {message: 'type must be Paris/Cologne/Brussels/Amsterdam/Hamburg/Dusseldorf'})
  public city!: City;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsArray({message: 'Field images must be an array'})
  @Min(1, {message: 'Minimum goods is 1'})
  @Max(7, {message: 'Maximum goods is 7'})
  public goods!: Goods[];

  @IsArray({message: 'Field images must be an array'})
  @Min(6, {message: 'Minimum images is 6'})
  @Max(6, {message: 'Maximum images is 6'})
  public images!: Images[];

  @IsBoolean({message: 'isFavorite is required'})
  public isFavorite!: boolean;

  @IsBoolean({message: 'isPremium is required'})
  public isPremium!: boolean;

  public latitude!: number;
  public longitude!: number;

  @Min(1, {message: 'Minimum maxAdults is 1'})
  @Max(10, {message: 'Maximum maxAdults is 10'})
  public maxAdults!: number;

  public previewImage!: string;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 100000'})
  public price!: number;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @IsEnum(RoomType, {message: 'type must be apartment/house/room/hotel'})
  public type!: RoomType;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public createdDate!: Date;

  public hostId!: string;
}
