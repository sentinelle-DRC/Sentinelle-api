import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entites/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
// import { SchoolDocument } from 'src/school/entities/school.entity';

@Injectable()
export class UserService {
  private saltOrRounds = 10;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    // private studentModel: Model<StudentDocument>,
    // private schoolModel: Model<SchoolDocument>,
    private jwtService: JwtService,
  ) {}
  async create(createuserdto: CreateUserDto) {
    // console.log(createuserdto);
    const password: string = createuserdto.password;
    const school = createuserdto.role === 'user' ? createuserdto.school : null;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createuserdto.password;
    delete createuserdto.school;
    const user = new this.userModel({
      ...createuserdto,
      password: hash,
      school: school,
    });

    const newUser = await user.save();

    const payload = {
      userId: newUser._id,
      phoneNumber: newUser.phoneNumber,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
    });
    return { user: newUser, token: `Bearer ${token}` };
  }
  async findAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      return error.message;
    }
  }
  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.userModel.findOne({ _id: id }).populate({
        path: 'school',
      });
      return resultat;
    } catch (error) {
      return error.message;
    }
  }
}
