import { Module } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { RessourceController } from './ressource.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ressource, RessourceSchema } from './entities/ressource.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ressource.name, schema: RessourceSchema },
    ]),
  ],
  controllers: [RessourceController],
  providers: [RessourceService],
  exports: [RessourceService],
})
export class RessourceModule {}
