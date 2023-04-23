import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  create(@Body() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @Get()
  findAll() {
    return [
      {
        course: 'Anglais',
        type: 'Dévoir',
        cote: 2,
        maxima: 20,
        date: '1/04/2023',
        description: 'Basics of sentences',
      },
      {
        course: 'Anglais',
        type: 'intero',
        cote: 10,
        maxima: 30,
        date: '21/04/2023',
        description: 'the adverbs of times and places',
      },
      {
        course: 'Math',
        type: 'Intero',
        cote: 14,
        maxima: 20,
        date: '14/03/2023',
        description: 'les équations de 2nd dégré ',
      },
      {
        course: 'Français',
        type: 'Dévoir',
        cote: 28,
        maxima: 30,
        date: '27/03/2023',
        description: 'les ajéctifs qualificatifs',
      },
    ];
    // return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.workService.update(+id, updateWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workService.remove(+id);
  }
}
