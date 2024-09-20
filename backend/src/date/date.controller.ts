import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateService } from './date.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    return this.dateService.create(createDateDto);
  }

  @Get()
  findAll() {
    return this.dateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
    return this.dateService.update(+id, updateDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dateService.remove(+id);
  }
}
