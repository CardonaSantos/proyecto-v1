import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidatorUserPipe } from './pipes/validator-user/validator-user.pipe';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService, //si vas a usar un service, esporta su service en su propio module | y luego importa su module en tu module correspondiente al resource donde lo quieres usar
  ) {}
  //CREAR UN USER
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const NewUser = await this.usersService.createUser(createUserDto);

    // return this.usersService.createUser(createUserDto);
    return await this.authService.loginUser(NewUser);
  }

  //BUSCAR TODOS
  @Get('')
  @UsePipes(new ValidationPipe())
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  //BUSCAR UNO
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneUser(id);
  }

  // @Get('greet')
  // usingPipeController(
  //   @Query(ValidatorUserPipe) query: { name: string; age: number },
  // ) {
  //   return `Hello ${query.name} you've ${query.age} years old`;
  // }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateOneUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.removeOneUser(id);
  }

  @Delete('/delete-all')
  async deleteAllUSers() {
    return await this.usersService.deleteAllUsers();
  }
}
