import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolService } from 'src/school/school.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './entities/class.entity';
@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private ClassModel: Model<ClassDocument>,
    private schoolService: SchoolService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const classe = new this.ClassModel({
      ...createClassDto,
    });

    const newClass = await classe.save().catch((e) => {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
    const addtoSchool = await this.schoolService.addClass(
      createClassDto.school,
      newClass._id,
    );
    return newClass;
  }

  async addClass(id: string, classe: any) {
    const updatedSchool = await this.ClassModel.updateOne(
      { _id: id },
      { $push: { classes: classe } },
    );
    return updatedSchool;
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
