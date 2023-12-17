import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ressource, RessourceDcoument } from './entities/ressource.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class RessourceService {
  constructor(
    @InjectModel(Ressource.name)
    private ressource: Model<RessourceDcoument>,
  ) {}
  async create(createRessourceDto: CreateRessourceDto) {
    try {
      return await this.ressource
        .create({ ...createRessourceDto })
        .catch((e) => {
          throw new HttpException(
            { error: 'error', e },
            HttpStatus.BAD_REQUEST,
          );
        });
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.ressource.find().populate('field');
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.ressource.findOne({ _id: id }).populate('field');
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, updateRessourceDto: UpdateRessourceDto) {
    return `This action updates a #${id} ressource`;
  }

  remove(id: number) {
    return `This action removes a #${id} ressource`;
  }
}
