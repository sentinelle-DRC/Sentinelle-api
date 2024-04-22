/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    // console.log(createScheduleDto);
    try {
      const oldSchedule = await this.schedule.findOne({
        $and: [
          { class: createScheduleDto.class },
          { course: createScheduleDto.course },
        ],
      });
      if (oldSchedule) return 'shedull for this class exist';
      else {
        const newSchedull = await this.schedule
          .create({
            ...createScheduleDto,
          })
          .catch((e) => {
            throw new HttpException(
              { error: 'error', e },
              HttpStatus.BAD_REQUEST,
            );
          });
        return newSchedull;
      }
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.schedule
      .find()
      .populate({ path: 'class', select: 'level' });
  }

  async findByClass(classId: mongoose.Schema.Types.ObjectId) {
    try {
      const schedule = await this.schedule
        .find({ class: classId })
        // .select({ name:  })
        .populate({
          path: 'course',
          select: 'field',
          populate: [
            { path: 'field', select: 'name' },
            // { path: 'teacher', select: 'firstname' },
          ],
        });

      let lundi = [{ day: 'lundi', course: [] }];
      let mardi = [];
      let mercredi = [];
      let jeudi = [];
      let vendredi = [];
      let samedi = [];
      let newSchedull = [];
      let course = [];

      schedule
        .filter((a) => a.day === 'lundi')
        .map((d) => {
          let aleatCourse = d?.course?.field;
          aleatCourse['startHour'] = 1;
          // Object.assign(aleatCourse, { startHour: d?.startHour });
          // Object.assign(aleatCourse, { endHour: d?.endHour });
          course.push(aleatCourse);
          console.log(aleatCourse, 'oo');
        });
      lundi[0].course = course;
      schedule
        .filter((a) => a.day === 'mardi')
        .map((d) => {
          mardi.push({ day: d.day });
          mardi.push({
            startHour: d?.startHour,
            endHour: d?.endHour,
            cours: d?.course?.field,
          });
        });
      schedule
        .filter((a) => a.day === 'mercredi')
        .map((d) => {
          mercredi.push({ day: d.day });
          mercredi.push({
            startHour: d?.startHour,
            endHour: d?.endHour,
            cours: d?.course?.field,
          });
        });
      schedule
        .filter((a) => a.day === 'jeudi')
        .map((d) => {
          jeudi.push({ day: d.day });
          jeudi.push({
            startHour: d?.startHour,
            endHour: d?.endHour,
            cours: d?.course?.field,
          });
        });
      schedule
        .filter((a) => a.day === 'vendredi')
        .map((d) => {
          vendredi.push({ day: d.day });
          vendredi.push({
            startHour: d?.startHour,
            endHour: d?.endHour,
            cours: d?.course?.field,
          });
        });
      schedule
        .filter((a) => a.day === 'samedi')
        .map((d) => {
          samedi.push({ day: d.day });
          samedi.push({
            startHour: d?.startHour,
            endHour: d?.endHour,
            cours: d?.course?.field,
          });
        });

      newSchedull.push(lundi);
      newSchedull.push(mardi);
      newSchedull.push(mercredi);
      newSchedull.push(jeudi);
      newSchedull.push(vendredi);
      newSchedull.push(samedi);

      return newSchedull;
      // return schedule;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.schedule
      .findOne({ _id: id })
      .populate({
        path: 'class',
        select: 'level',
        populate: {
          path: 'option',
          select: 'name',
        },
      })
      .populate({
        path: 'course',
        select: '',
        populate: [
          { path: 'field', select: 'name' },
          { path: 'teacher', select: ['firstName', 'lastName'] },
        ],
      });
    // .populate({ path: 'class', select: 'level' });
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
