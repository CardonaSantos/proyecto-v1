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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Get()
  async findAllCustomers() {
    return await this.customersService.findAllCustomers();
  }

  @Get('/all-customers-with-discount')
  async findAllCustomersWithDiscount() {
    return await this.customersService.findOneCustomersWithDiscount();
  }

  @Get(':id')
  findOneCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOneCustomer(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.updateOneCustomer(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.removeOneCustomer(id);
  }

  @Delete('/delete-all-customers')
  async removeAllCustomers() {
    return await this.customersService.removeAllCustomers();
  }
}
