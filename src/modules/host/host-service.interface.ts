import {DocumentType} from '@typegoose/typegoose';
import CreateHostDto from './dto/create-host.dto.js';
import {HostEntity} from './host.entity.js';

export interface HostServiceInterface {
  create(dto: CreateHostDto, salt: string): Promise<DocumentType<HostEntity>>;
  findByEmail(email: string): Promise<DocumentType<HostEntity> | null>;
  findOrCreate(dto: CreateHostDto, salt: string): Promise<DocumentType<HostEntity>>;
}
