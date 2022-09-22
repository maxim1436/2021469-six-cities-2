import EventEmitter from 'events';
// import { Offer } from '../../types/offer.type.js';
import { createReadStream } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }

  public async read():Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: 16384, // 16KB
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);

    // public toArray(): Offer[] {
    //   if (!this.rawData) {
    //     return [];
    //   }

    //   return this.rawData
    //     .split('\n')
    //     .filter((row) => row.trim() !== '')
    //     .map((line) => line.split('\t'))
    //     .map(([bedrooms, city, description, goods, images, isFavorite, isPremium, latitude, longitude, maxAdults, previewImage, price, rating, title, type, createdDate, avatarUrl, email, password, isPro, name]) => ({
    //       bedrooms: Number.parseInt(bedrooms, 10),
    //       city,
    //       description,
    //       goods: goods.split(';')
    //         .map((good) => ({good})),
    //       images: images.split(';')
    //         .map((img) => ({img})),
    //       isFavorite: Boolean(Number.parseInt(isFavorite, 10)),
    //       isPremium: Boolean(Number.parseInt(isPremium, 10)),
    //       latitude: Number.parseFloat(latitude),
    //       longitude: Number.parseFloat(longitude),
    //       maxAdults: Number.parseInt(maxAdults, 10),
    //       previewImage,
    //       price: Number.parseInt(price, 10),
    //       rating: Number.parseFloat(rating),
    //       title,
    //       type,
    //       createdDate: new Date(createdDate),
    //       host: {avatarUrl, email, password, isPro: Boolean(Number.parseInt(isPro, 10)), name},
    //     }));
    // }
  }
}
