import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ressource, RessourceDcoument } from './entities/ressource.entity';
import mongoose, { Model } from 'mongoose';
import { FieldService } from 'src/field/field.service';

@Injectable()
export class RessourceService {
  constructor(
    @InjectModel(Ressource.name)
    private ressource: Model<RessourceDcoument>,
    private fieldservice: FieldService,
  ) {}
  async create(createRessourceDto: CreateRessourceDto) {
    try {
      // eslint-disable-next-line prettier/prettier
      const newRessource = await this.ressource.create({ ...createRessourceDto ,});
      // await this.field.create({
      //   ...createFieldDto,
      // });
      //add to field
      await this.fieldservice.addRessource(
        createRessourceDto.field,
        newRessource._id,
      );
      return newRessource;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return await this.ressource.find();
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      return await this.ressource
        .findOne({ _id: id })
        .populate({ path: 'field', select: 'name' });
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateRessourceDto: UpdateRessourceDto,
  ) {
    return await this.ressource.deleteOne({ _id: id }, { updateRessourceDto });
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.ressource.deleteOne({ _id: id });
  }
}
