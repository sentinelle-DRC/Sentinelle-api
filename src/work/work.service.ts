import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Work, WorkDocument } from './entities/work.entity';
import mongoose, { Model } from 'mongoose';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name)
    private work: Model<WorkDocument>,
    private courseService: CourseService,
  ) {}
  async create(createWorkDto: CreateWorkDto) {
    try {
      const newWork = await this.work.create({ ...createWorkDto });
      // add to course
      await this.courseService.addWork(createWorkDto.course, newWork._id);
      return newWork;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.work.find();
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.work.findOne({ _id: id }).populate({
        path: 'course',
        select: ['field', 'teacher'],
        populate: [
          { path: 'field', select: 'name' },
          { path: 'teacher', select: 'firstName' },
        ],
      });
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, updateWorkDto: UpdateWorkDto) {
    return `This action updates a #${id} work`;
  }

  remove(id: number) {
    return `This action removes a #${id} work`;
  }
  async addResult(id: mongoose.Schema.Types.ObjectId, result: any) {
    return await this.work.updateOne(
      { _id: id },
      { $push: { results: result } },
    );
  }
}
