import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ressource, RessourceDocument } from './entities/ressource.entity';
import { Model } from 'mongoose';

@Injectable()
export class RessourceService {
  constructor(
    @InjectModel(Ressource.name)
    private RessourceModel: Model<RessourceDocument>,
  ) {}
  async create(createRessourceDto: CreateRessourceDto) {
    const newRssource = new this.RessourceModel({
      ...createRessourceDto,
    });

    return newRssource.save().catch((e) => {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    });
  }

  findAll() {
    return this.RessourceModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} ressource`;
  }

  update(id: number, updateRessourceDto: UpdateRessourceDto) {
    return `This action updates a #${id} ressource`;
  }

  remove(id: number) {
    return `This action removes a #${id} ressource`;
  }
}
