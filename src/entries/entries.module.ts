import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { EntryRepository } from 'src/repository/entry/mocks/entry.repository';

@Module({
    imports: [EntriesModule],
    controllers: [EntriesController],
    providers: [EntriesService, EntryRepository],
  })
export class EntriesModule {}
