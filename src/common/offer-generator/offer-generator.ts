import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_RATING = 0;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const bedrooms = generateRandomValue(1, 9).toString();
    const city = getRandomItem<string>(this.mockData.cities);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isFavorite = generateRandomValue(0,1).toString();
    const isPremium = generateRandomValue(0,1).toString();
    const latitude = generateRandomValue(52.35514938400000, 52.35514938499999).toString();
    const longitude = generateRandomValue(4.673877537400000, 4.673877537499999).toString();
    const maxAdults = generateRandomValue(1, 9).toString();
    const previewImage = getRandomItem<string>(this.mockData.images);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const title = getRandomItem<string>(this.mockData.titles);
    const type = getRandomItem<string>(this.mockData.types);
    const createdDate =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const email = getRandomItem<string>(this.mockData.emails);
    const password = generateRandomValue(10000,99999).toString();
    const isPro = generateRandomValue(0,1).toString();
    const name = getRandomItem<string>(this.mockData.names);

    return [
      bedrooms, city, description, goods, images,
      isFavorite, isPremium, latitude, longitude,
      maxAdults, previewImage, price, rating, title,
      type, createdDate, avatarUrl, email, password, isPro, name,
    ].join('\t');
  }
}
