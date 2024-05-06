import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { Entry } from '../models/entry.model';
import { EntriesService } from './entries.service';
import { EntryListPagination } from 'src/models/entry-list-pagination.model';

@Controller('entries')
export class EntriesController {
    constructor(private readonly entriesService: EntriesService) {}

    @Get()
    async getAllEntries(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<EntryListPagination> {
        return this.entriesService.findAllEntries(page, limit);
    }

    @Get(':id')
    async getEntryById(@Param('id') id: string): Promise<Entry> {
        return this.entriesService.findEntryById(id);
    }

    @Post()
    async addEntry(@Body() entry: Entry): Promise<Entry> {
        return this.entriesService.createEntry(entry);
    }

    @Put(':id')
    async updateEntry(@Param('id') id: string, @Body() entry: Partial<Entry>): Promise<Entry> {
        return this.entriesService.updateEntry(id, entry);
    }

    @Delete(':id')
    removeEntry(@Param('id') id: string): void {
        this.entriesService.deleteEntry(id);
    }
}
