import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from './entities/schedule.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private schedule: Model<ScheduleDocument>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const oldSchedule = await this.schedule.findOne({
        $and: [
          { class: createScheduleDto.class },
          { course: createScheduleDto.course },
        ],
      });
      if (oldSchedule) return 'shedull for this class exist';
      else {
        const newSchedule = new this.schedule({ ...CreateScheduleDto });
        return await newSchedule.save();
      }
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.schedule.find().populate('class').populate('course');
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.schedule
      .findOne({ _id: id })
      .populate('class')
      .populate('course');
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateScheduleDto: UpdateScheduleDto,
  ) {
    return await this.schedule.updateOne({ _id: id }, { updateScheduleDto });
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
