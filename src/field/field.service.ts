import { Injectable } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Field, FieldDocument } from './entities/field.entity';
import mongoose, { Model } from 'mongoose';
import path from 'path';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field.name)
    private field = Model<FieldDocument>,
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    const oldField = await this.field.findOne({ name: createFieldDto.name });
    if (oldField) return oldField;
    else {
      const newField = await this.field.create({
        ...createFieldDto,
      });
      return newField;
    }
  }

  async findAll() {
    const field = await this.field.find();
    return field;
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.field.findOne({ _id: id });
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateFieldDto: UpdateFieldDto,
  ) {
    return await this.field.updateOne({ _id: id }, { updateFieldDto });
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
  async addCourse(id: mongoose.Schema.Types.ObjectId, course: any) {
    return await this.field.updateOne(
      { _id: id },
      { $push: { courses: course } },
    );
  }
  async addRessource(id: mongoose.Schema.Types.ObjectId, ressource: any) {
    return await this.field.updateOne(
      { _id: id },
      { $push: { ressources: ressource } },
    );
  }
}
