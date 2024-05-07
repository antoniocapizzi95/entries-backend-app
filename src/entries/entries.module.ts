import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
//import { EntryRepository } from '../repository/entry/mocks/entry.repository';
import { EntryRepository } from '../repository/entry/mongo/entry.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry as EntryMongo, EntrySchema } from 'src/repository/entry/mongo/schemas/entry.schema';

@Module({
    imports: [EntriesModule, MongooseModule.forFeature([{ name: EntryMongo.name, schema: EntrySchema }])],
    controllers: [EntriesController],
    providers: [EntriesService, EntryRepository],
  })
export class EntriesModule {}
