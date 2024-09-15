import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Usa forwardRef para evitar dependencia circular
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MySecretKey',
      signOptions: { expiresIn: '60min' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
