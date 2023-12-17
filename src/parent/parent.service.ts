import { HttpException, Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Parent, ParentDocument } from './entities/parent.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParentService {
  private saltOrRounds = 10;
  constructor(
    @InjectModel(Parent.name)
    private parentModel: Model<ParentDocument>,
  ) {}

  async create(createParentDto: CreateParentDto) {
    const password = createParentDto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createParentDto.password;

    const parent = new this.parentModel({
      ...createParentDto,
      password: hash,
    });
    return parent.save().catch((e) => {
      throw new HttpException({ error: e }, 400, {
        cause: new Error(e),
      });
    });
  }

  findAll() {
    return `This action returns all parent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parent`;
  }

  update(id: number, updateParentDto: UpdateParentDto) {
    return `This action updates a #${id} parent`;
  }
  remove(id: number) {
    return `This action removes a #${id} parent`;
  }
  async addStudent(id: mongoose.Schema.Types.ObjectId, student: any) {
    const updatedSchool = await this.parentModel.updateOne(
      { _id: id },
      { $push: { students: student } },
    );
    return updatedSchool;
  }
}
