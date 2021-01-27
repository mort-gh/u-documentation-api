import { Module } from '@nestjs/common';

import { GraphqlService } from '../graphql';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';

@Module({
  imports: [],
  providers: [EntriesService, GraphqlService],
  controllers: [EntriesController],
})
export class EntriesModule {}
