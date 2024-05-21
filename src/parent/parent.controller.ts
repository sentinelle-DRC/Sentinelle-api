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
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiTags } from '@nestjs/swagger';
import mongoose, { Schema } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@ApiTags('Parents')
@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.parentService.findAll();
  }
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.parentService.findOne(id);
  }

  @Get('numberPhone/:phoneNumber')
  findByphoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.parentService.findParentByPhoneNumber(phoneNumber);
  }

  @Get('numberStudent/:phoneNumber')
  getNumberStudent(@Param('phoneNumber') phoneNumber: string) {
    return this.parentService.getNombreEnfant(phoneNumber);
  }

  @Patch('updateStateConnected/:phoneNumber')
  updateStateConnected(
    @Param('phoneNumber') phoneNumber: string,
    @Body() value: boolean,
  ) {
    return this.parentService.updateStateConnected(phoneNumber, value);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateParentDto: UpdateParentDto,
  ) {
    return this.parentService.update(id, updateParentDto);
  }

  @Post('addStudent/:parentId/:studentId')
  addNewStudent(
    @Param('parentId') parentId: mongoose.Schema.Types.ObjectId,
    @Param('studentId') studentId: Schema.Types.ObjectId,
    // @Body() updateParentDto: UpdateParentDto,
  ) {
    return this.parentService.addNewStudent(parentId, studentId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
