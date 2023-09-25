import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {

  constructor(
    @InjectModel(Schedule.name)
    private schedule:Model<ScheduleDocument>,

  ){}

  async create(createScheduleDto: CreateScheduleDto) {

    const newSchedule = await this.schedule.create({
      ...createScheduleDto
    })
    .catch((e)=>{
      throw new HttpException({error:"error occur",e},HttpStatus.INTERNAL_SERVER_ERROR)
    })

    return newSchedule;
    // return Date.now()
   
  }

  findAll() {
    return this.schedule.find().populate({
      path:"class",
        populate:"option",
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
