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
    try {
      return await this.OptionModel.find().populate({
        path: 'classes',
        populate: { path: 'school', select: '_id' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.OptionModel.findOne({ _id: id }).populate({
        path: 'classes',
        select: 'level',
      });
    } catch (error) {
      return error;
    }
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateOptionDto: UpdateOptionDto,
  ) {
    try {
      return await this.OptionModel.updateOne({ _id: id }, { updateOptionDto });
    } catch (error) {
      return error;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.OptionModel.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
  async addClass(id: mongoose.Schema.Types.ObjectId, classe: any) {
    return await this.OptionModel.updateOne(
      { _id: id },
      { $push: { classes: classe } },
    );
  }
}
