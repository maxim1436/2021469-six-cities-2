import {IsEmail, IsString} from 'class-validator';

export default class LoginHostDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsString({message: 'password is required'})
  public password!: string;
}
