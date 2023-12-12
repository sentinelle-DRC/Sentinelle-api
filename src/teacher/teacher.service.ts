import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher, TeacherDocument } from './entities/teacher.entity';
import mongoose, { Model } from 'mongoose';
// import { CourseService } from 'src/course/course.service';

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
    const teachers = await this.teacher
      .find()
      .populate('school')
      .populate({
        path: 'courses',
        select: { field: 1 },
        populate: { path: 'field' },
      });
    // .populate({
    //   path: 'school',
    //   // select: { field: 1 },
    //   // populate: { path: 'field' },
    // });
    return teachers;
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    const teacher = await this.teacher
      .findOne({ _id: id })
      .populate({
        path: 'courses',
        select: { field: 1 },
        populate: { path: 'field' },
      })
      .populate('school');
    return teacher;
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateTeacherDto: UpdateTeacherDto,
  ) {
    try {
      const updatedTeacher = await this.teacher.updateOne(
        { _id: id },
        updateTeacherDto,
      );
      return updatedTeacher;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId): Promise<string> {
    try {
      const result = await this.teacher.deleteOne({ _id: id });
      if (result.deletedCount == 0) return 'impossible to remove';
      else return 'teacher removed successfully';
    } catch (error) {
      return error.message;
    }
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
