import {Expose, Type} from 'class-transformer';
import UserResponse from '../../host/response/host.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public commentText!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'createdAt'})
  public postDate!: string;

  @Expose({ name: 'hostId'})
  @Type(() => UserResponse)
  public host!: UserResponse;
}
