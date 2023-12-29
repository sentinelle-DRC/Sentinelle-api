import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entites/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  private saltOrRounds = 10;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(createuserdto: CreateUserDto) {
    const password: string = createuserdto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createuserdto.password;
    const user = new this.userModel({
      ...createuserdto,
      password: hash,
    });

    return await user.save();
  }
  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.userModel.findOne({ _id: id });

      return resultat;
    } catch (error) {
      return error.message;
    }
  }
}
