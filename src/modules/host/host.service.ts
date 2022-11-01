import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {HostEntity} from './host.entity.js';
import CreateHostDto from './dto/create-host.dto.js';
import {HostServiceInterface} from './host-service.interface.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.types.js';
import LoginHostDto from './dto/login-host.dto.js';

@injectable()
export default class HostService implements HostServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.HostModel) private readonly hostModel: types.ModelType<HostEntity>
  ) {}

  public async create(dto: CreateHostDto, salt: string): Promise<DocumentType<HostEntity>> {
    const host = new HostEntity(dto);
    host.setPassword(dto.password, salt);

    const result = await this.hostModel.create(host);
    this.logger.info(`New host created: ${host.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<HostEntity> | null> {
    return this.hostModel.findOne({email});
  }

  public async findOrCreate(dto: CreateHostDto, salt: string): Promise<DocumentType<HostEntity>> {
    const existedHost = await this.findByEmail(dto.email);

    if (existedHost) {
      return existedHost;
    }

    return this.create(dto, salt);
  }

  public async verifyHost(dto: LoginHostDto, salt: string): Promise<DocumentType<HostEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (! user) {
      return null;
    }

    if (user.verifyPassword(dto.password, salt)) {
      return user;
    }

    return null;
  }
}
