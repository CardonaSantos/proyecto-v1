import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)], // Usa forwardRef para evitar dependencia circular
  providers: [UsersService, PrismaClient],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
