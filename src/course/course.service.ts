import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './entities/course.entity';
import mongoose, { Model } from 'mongoose';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private course: Model<CourseDocument>,
    @Inject(TeacherService)
    private teacherService: TeacherService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = await this.course
      .create({
        ...createCourseDto,
      })
      .catch((e) => {
        throw new HttpException({ error: 'error', e }, HttpStatus.BAD_REQUEST);
      });

    // console.log(createCourseDto.teacher);

    const updatedTeacher = await this.teacherService
      .addCourse(createCourseDto.teacher, newCourse)
      .catch((e) => {
        throw new HttpException({ error: 'error', e }, HttpStatus.BAD_REQUEST);
      });

    return updatedTeacher;
  }

  async findAll() {
    const course = await this.course.find().populate({ path: 'field' });

    return course;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
