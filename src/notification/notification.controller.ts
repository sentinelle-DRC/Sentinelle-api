import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@UseGuards(JwtAuthGuard)
@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.notificationService.remove(id);
  }
}
