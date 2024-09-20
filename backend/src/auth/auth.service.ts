import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { loginDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateMyUser(loginDTO: loginDTO): Promise<any> {
    const user = await this.userService.findByEmail(loginDTO.correo);

    if (user && (await bcrypt.compare(loginDTO.contrasena, user.contrasena))) {
      const { contrasena, ...result } = user;
      return result;
    }
    return null;
  }

  async loginUser(usuario: CreateAuthDto) {
    const payload = {
      // contrasena: usuario.contrasena,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,

      sub: usuario.id,
    };

    return {
      authToken: this.jwtService.sign(payload),
      usuario,
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
