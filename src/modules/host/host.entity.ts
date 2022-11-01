import { Host } from '../../types/host.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import {createSHA256} from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'hosts'
  }
})

export class HostEntity extends defaultClasses.TimeStamps implements Host {
  constructor(data: Host) {
    super();

    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.name = data.name;
    this.password = data.password;
    this.isPro = data.isPro;
  }

  @prop({unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'], required: true, default: ''})
  public email!: string;

  @prop({default : 'avatar-max.jpg'})
  public avatarUrl!: string;

  @prop({required: true, default: ''})
  public password!: string;

  @prop({required: true, minlength: [1, 'Min length for name is 1'], maxlength: [15, 'Max length for name is 15']})
  public name!: string;

  @prop({required: true})
  public isPro!: boolean;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const HostModel = getModelForClass(HostEntity);
