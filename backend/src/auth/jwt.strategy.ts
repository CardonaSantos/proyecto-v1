import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'MySecretKey', // Usar 'JWT_SECRET' desde config
    });
  }

  async validate(payload: any) {
    // Aquí puedes incluir los campos del payload que necesites
    return {
      userId: payload.id,
      email: payload.correo,
      name: payload.nombre,
    };
  }
}
