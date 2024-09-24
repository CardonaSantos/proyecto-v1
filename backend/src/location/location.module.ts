import { Module, forwardRef } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationGateway } from './location.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationGateway, PrismaService],
  imports: [forwardRef(() => LocationModule)],
  exports: [LocationService],
})
export class LocationModule {}
