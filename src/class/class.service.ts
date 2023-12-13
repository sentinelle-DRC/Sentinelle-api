import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolService } from 'src/school/school.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './entities/class.entity';
import { OptionService } from 'src/option/option.service';
@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private ClassModel: Model<ClassDocument>,
    private schoolService: SchoolService,
    private optionService: OptionService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const classe = new this.ClassModel({
      ...createClassDto,
    });

    const newClass = await classe.save();
    //  addtoSchool
    await this.schoolService.addClass(createClassDto.school, newClass._id);
    // addtoOption
    await this.optionService.addClass(createClassDto.option, newClass._id);
    return newClass;
  }

  async findAll() {
    const classes = await this.ClassModel.find()
      .populate({ path: 'school', select: { _id: 1, name: 1 } })
      .populate('option');
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
