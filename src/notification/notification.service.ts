import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './entities/notification.entity';
import mongoose, { Model } from 'mongoose';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notification: Model<NotificationDocument>,
    private studentService: StudentService,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const newNotif = await this.notification.create({
        ...createNotificationDto,
      });
      //add to student list
      await this.studentService.addNotification(
        createNotificationDto.student,
        newNotif._id,
      );
      return newNotif;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.notification.find();
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.notification
        .findOne({ _id: id })
        .populate({ path: 'student', select: ['firstName', 'lastName'] });
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateNotificationDto: UpdateNotificationDto,
  ) {
    try {
      return await this.notification.updateOne(
        { _id: id },
        { updateNotificationDto },
      );
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.notification.deleteOne({ _id: id });
  }
}
