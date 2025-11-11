import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Agency, AgencySchema } from './schema/agency.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Agency.name, schema: AgencySchema }])],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
