import crypto from 'crypto';
import * as jose from 'jose';
import { Offer } from '../types/offer.type';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [bedrooms, city, description, goods, images, isFavorite, isPremium, latitude,
    longitude, maxAdults, previewImage, price, rating, title, type, createdDate, avatarUrl, email, password, isPro, name] = tokens;
  return {
    bedrooms: Number.parseInt(bedrooms, 10),
    city,
    description,
    goods: goods.split(';')
      .map((good) => ({good})),
    images: images.split(';')
      .map((img) => ({img})),
    isFavorite: Boolean(Number.parseInt(isFavorite, 10)),
    isPremium: Boolean(Number.parseInt(isPremium, 10)),
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
    maxAdults: Number.parseInt(maxAdults, 10),
    previewImage,
    price: Number.parseInt(price, 10),
    rating: Number.parseFloat(rating),
    title,
    type,
    createdDate: new Date(createdDate),
    host: {avatarUrl, email, password, isPro: Boolean(Number.parseInt(isPro, 10)), name},
  } as Offer;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
