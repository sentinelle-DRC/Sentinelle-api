import mongoose from 'mongoose';

export interface payloadInterface {
  id: mongoose.Schema.Types.ObjectId;
  phoneNumber: string;
  password: string;
}
