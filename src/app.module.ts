import { Module } from '@nestjs/common';

import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [EntriesModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
