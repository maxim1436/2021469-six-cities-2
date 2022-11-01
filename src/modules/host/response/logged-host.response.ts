import {Expose} from 'class-transformer';

export default class LoggedHostResponse {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;
}
