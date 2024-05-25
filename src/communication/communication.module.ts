import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Communication,
  CommunicationSchema,
} from './entities/communication.entity';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Communication.name, schema: CommunicationSchema },
    ]),
    ClassModule,
  ],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
