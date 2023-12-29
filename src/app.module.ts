import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { SchoolModule } from './school/school.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { OptionModule } from './option/option.module';
import { CommunicationModule } from './communication/communication.module';
import { ScheduleModule } from './schedule/schedule.module';
import { WorkModule } from './work/work.module';
import { NotificationModule } from './notification/notification.module';
import { RessourceModule } from './ressource/ressource.module';
import { FieldModule } from './field/field.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ParentModule,
    StudentModule,
    AuthModule,
    CourseModule,
    SchoolModule,
    ClassModule,
    TeacherModule,
    OptionModule,
    CommunicationModule,
    ScheduleModule,
    WorkModule,
    NotificationModule,
    RessourceModule,
    FieldModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
