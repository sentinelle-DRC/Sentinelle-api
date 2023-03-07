import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './entities/class.entity';
@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private ClassModel: Model<ClassDocument>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const classe = new this.ClassModel({
      ...createClassDto,
    });
    console.log(createClassDto);

    return classe.save();
  }

  async findAll() {
    const classes = await this.ClassModel.find();
    return classes;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
