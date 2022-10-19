import mongoose from 'mongoose';
import { Host } from '../../types/host.type.js';

export interface HostDocument extends Host, mongoose.Document {
  createdAt: Date,
  updatedAt: Date,
}

const hostSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
    default : 'avatar-max.jpg'
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12'],
  },
  isPro: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
}, {
  timestamps: true,
});

export const HostModel = mongoose.model<HostDocument>('Host', hostSchema);
