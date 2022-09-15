import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([bedrooms, city, description, goods, images, isFavorite, isPremium, latitude, longitude, maxAdults, previewImage, price, rating, title, type, createdDate, avatarUrl, email, password, isPro, name]) => ({
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
      }));
  }
}
