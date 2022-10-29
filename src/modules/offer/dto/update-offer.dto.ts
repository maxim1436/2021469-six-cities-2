import { City } from '../../../types/city.enum.js';
import { RoomType } from '../../../types/room-type.enum.js';
import { Goods } from '../../../types/goods.type.js';
import { Images } from '../../../types/images.type.js';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsBoolean,
  IsArray
} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @Min(1, {message: 'Minimum bedrooms is 1'})
  @Max(8, {message: 'Maximum bedrooms is 8'})
  public bedrooms?: number;

  @IsOptional()
  @IsEnum(City, {message: 'type must be Paris/Cologne/Brussels/Amsterdam/Hamburg/Dusseldorf'})
  public city?: City;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description?: string;

  @IsOptional()
  @IsArray({message: 'Field images must be an array'})
  @Min(1, {message: 'Minimum goods is 1'})
  @Max(7, {message: 'Maximum goods is 7'})
  public goods?: Goods[];

  @IsOptional()
  @IsArray({message: 'Field images must be an array'})
  @Min(6, {message: 'Minimum images is 6'})
  @Max(6, {message: 'Maximum images is 6'})
  public images?: Images[];

  @IsOptional()
  @IsBoolean({message: 'isFavorite is required'})
  public isFavorite?: boolean;

  @IsOptional()
  @IsBoolean({message: 'isPremium is required'})
  public isPremium?: boolean;

  public latitude?: number;
  public longitude?: number;

  @IsOptional()
  @Min(1, {message: 'Minimum maxAdults is 1'})
  @Max(10, {message: 'Maximum maxAdults is 10'})
  public maxAdults?: number;

  public previewImage?: string;

  @IsOptional()
  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(200000, {message: 'Maximum price is 100000'})
  public price?: number;

  @IsOptional()
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating?: number;

  @IsOptional()
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title?: string;

  @IsOptional()
  @IsEnum(RoomType, {message: 'type must be apartment/house/room/hotel'})
  public type?: RoomType;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public createdDate?: Date;
}
