import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/student/entities/student.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { School, SchoolDocument } from './entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name)
    private SchoolModel: Model<SchoolDocument>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const school = new this.SchoolModel({
      ...createSchoolDto,
    });

    return school.save().catch((e) => {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll() {
    const schools = await this.SchoolModel.find().populate('student');
    return schools;
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    console.log(updateSchoolDto);
    const updatedSchool = await this.SchoolModel.updateOne(
      { id },
      updateSchoolDto,
    );
    return updatedSchool;
  }

  remove(id: number) {
    return `This action removes a #${id} school`;
  }

  async addStudent(id: mongoose.Schema.Types.ObjectId, student: any) {
    const updatedSchool = await this.SchoolModel.updateOne(
      { _id: id },
      { $push: { student: student } },
    );
    return updatedSchool;
  }
}
