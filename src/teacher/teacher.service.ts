import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './entities/teacher.entity';
import mongoose, { Model } from 'mongoose';
import { CourseService } from 'src/course/course.service';

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

  async findAll() {
    const teachers = await this.teacher.find().populate({
      path: 'courses',
      select: { field: 1 },
      populate: { path: 'field' },
    });
    return teachers;
  }

  async findOne(id: number) {
    const teacher = await this.teacher.findOne({ id: id }).populate({
      path: 'courses',
      select: { field: 1 },
      populate: { path: 'field' },
    });
    return teacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }

  async addCourse(id: mongoose.Schema.Types.ObjectId, course: any) {
    const teacherUpdated = await this.teacher.updateOne(
      {
        _id: id,
      },
      {
        $push: { courses: course },
      },
    );
    return teacherUpdated;
  }
}
