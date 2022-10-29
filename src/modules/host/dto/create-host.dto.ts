import {IsEmail, IsString, Length, IsBoolean} from 'class-validator';

export default class CreateHostDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string ;

  public avatarUrl!: string;

  @IsString({message: 'password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @IsString({message: 'firstname is required'})
  @Length(1, 15, {message: 'Min length is 1, max is 15'})
  public name!: string;

  @IsBoolean({message: 'isPro is required'})
  public isPro!: boolean;
}
