import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
// import path from 'path';
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
    try {
      const school = new this.SchoolModel({
        ...createSchoolDto,
      });

      return school.save().catch((e) => {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const schools = await this.SchoolModel.find()
        .populate('students')
        .populate({ path: 'classes', populate: { path: 'option' } });
      return schools;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const school = await this.SchoolModel.find({ _id: id })
        .populate({
          path: 'classes',
          populate: { path: 'option' },
        })
        .populate('students');
      return school;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    try {
      const updatedSchool = await this.SchoolModel.updateOne(
        { id },
        updateSchoolDto,
      );
      return updatedSchool;
    } catch (error) {
      // remove(id: number) {
      //   return `This action removes a #${id} school`;

      // }
      return error.message;
    }
  }

  async addStudent(id: mongoose.Schema.Types.ObjectId, student: any) {
    const updatedSchool = await this.SchoolModel.updateOne(
      { _id: id },
      { $push: { students: student } },
    );
    return updatedSchool;
  }
  async addClass(id: string, classe: any) {
    const updatedSchool = await this.SchoolModel.updateOne(
      { _id: id },
      { $push: { classes: classe } },
    );
    return updatedSchool;
  }
  async remove(id: mongoose.Schema.Types.ObjectId): Promise<string> {
    try {
      const result = await this.SchoolModel.remove({ _id: id });
      if (result.deletedCount == 0) return 'impossible to remove';
      else return 'school removed successfully';
    } catch (error) {
      console.log(error);
    }
  }
}
