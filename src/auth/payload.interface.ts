import mongoose from 'mongoose';

export interface payloadInterface {
  userId: mongoose.Schema.Types.ObjectId;
  phoneNumber: string;
  password: string;
}
