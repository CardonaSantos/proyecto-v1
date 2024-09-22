import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  async createCheckin(@Body() createAttendanceDto: CreateAttendanceDto) {
    return await this.attendanceService.createCheckIn(createAttendanceDto);
  }

  @Patch('/check-out/:id')
  async createCheckout(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return await this.attendanceService.createCheckOut(updateAttendanceDto, id);
  }

  @Get()
  async findAll() {
    return await this.attendanceService.findAll();
  }

  @Get('/today-check/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.attendanceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return await this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete('/delete-all')
  async removeAll(@Param('id') id: string) {
    return await this.attendanceService.removeAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.attendanceService.remove(+id);
  }
}
