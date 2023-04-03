import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './entities/teacher.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name)
    private teacher = Model<TeacherDocument>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teacher.create({
      ...createTeacherDto,
    });
    return newTeacher;
  }

  findAll() {
    const teachers = this.teacher.find();
    return teachers;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
