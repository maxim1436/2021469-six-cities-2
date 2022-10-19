import crypto from 'crypto';
import { Offer } from '../types/offer.type';

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
