import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true
  }),
    MongooseModule.forRoot('mongodb+srv://sirMelka:SENTinelle1945@sentinelle.oukuvgu.mongodb.net/sentinelledB?retryWrites=true&w=majority'),
    ParentModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
