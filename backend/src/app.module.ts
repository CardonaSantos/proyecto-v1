import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    NotificationsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible en toda la aplicación
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
