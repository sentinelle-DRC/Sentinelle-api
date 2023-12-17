import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Work, WorkDocument } from './entities/work.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name)
    private work: Model<WorkDocument>,
  ) {}
  async create(createWorkDto: CreateWorkDto) {
    try {
      return await this.work.create({ ...createWorkDto }).catch((e) => {
        throw new HttpException({ error: 'error', e }, HttpStatus.BAD_REQUEST);
      });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.work.find().populate('course');
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.work.findOne({ _id: id }).populate('course');
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
}
