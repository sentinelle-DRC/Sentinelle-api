import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import mongoose from 'mongoose';

@Controller('ressource')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}

  @Post()
  create(@Body() createRessourceDto: CreateRessourceDto) {
    return this.ressourceService.create(createRessourceDto);
  }

  @Get()
  findAll() {
    return [
      {
        title: "j'apprends les Maths",
        type: 'Livre',
        price: 'Gratuit',
        cover:
          'https://m.media-amazon.com/images/I/610RsJK5jlL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        title: 'Unicef: cahier pédagogique',
        type: 'Livre',
        price: 'Gratuit',
        cover:
          'https://www.cahiers-pedagogiques.com/wp-content/uploads/2019/09/arton12217.jpg',
      },
      {
        title: 'Pratique des maths',
        type: 'Livre',
        price: 'Gratuit',
        cover:
          'https://librairiespaulines.com/wp-content/uploads/2020/09/Math-3.jpg',
      },
      {
        title: 'Micro Physique',
        type: 'Livre',
        price: 'Gratuit',
        cover:
          'https://www.editions-hatier.fr/sites/default/files/couvertures/couverture_8588402.jpg',
      },
    ];

    // return this.ressourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.ressourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRessourceDto: UpdateRessourceDto,
  ) {
    return this.ressourceService.update(+id, updateRessourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ressourceService.remove(+id);
  }
}
