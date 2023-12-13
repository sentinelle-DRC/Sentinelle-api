import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option, OptionDocument } from './entities/option.entity';
@Injectable()
export class OptionService {
  constructor(
    @InjectModel(Option.name)
    private OptionModel: Model<OptionDocument>,
  ) {}
  async create(createOptionDto: CreateOptionDto) {
    const option = new this.OptionModel({
      ...createOptionDto,
    });
    return option.save();
  }

  async findAll() {
    return await this.OptionModel.find().populate('classes');
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
  async addClass(id: mongoose.Schema.Types.ObjectId, classe: any) {
    return await this.OptionModel.updateOne(
      { _id: id },
      { $push: { classes: classe } },
    );
  }
}
