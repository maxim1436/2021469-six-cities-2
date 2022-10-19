import { Host } from './host.type.js';

export type Comment = {
  commentText: string;
  postDate: Date;
  rating: number;
  host: Host;
}
