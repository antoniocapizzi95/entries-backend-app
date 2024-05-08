import { Injectable } from '@nestjs/common';
import { Entry } from '../models/entry.model';
//import { EntryRepository } from '../repository/entry/mocks/entry.repository';
import { EntryRepository } from '../repository/entry/mongo/entry.repository';
import { EntryListPagination } from '../models/entry-list-pagination.model';
import { EntryList } from 'src/models/entry-list.model';
import { generateUUID } from '../utils/generate-uuid';

@Injectable()
export class EntriesService {
    constructor(private readonly entryRepository: EntryRepository) {}

    async findAllEntries(page: number, limit: number): Promise<EntryListPagination> {
        const entries = await this.entryRepository.findAll(page, limit);
        const count = await this.entryRepository.getCount();
        return this.mapPagination(entries, page, limit, count);
    }

    async findEntryById(id: string): Promise<Entry> {
        return this.entryRepository.findById(id);
    }

    async createEntry(entry: Entry): Promise<Entry> {
        entry.timestamp = new Date().toISOString();
        entry.id = generateUUID();
        return this.entryRepository.create(entry);
    }

    async updateEntry(id: string, entryData: Partial<Entry>): Promise<Entry> {
        delete entryData?.id;
        delete entryData?.timestamp;
        return this.entryRepository.update(id, entryData);
    }

    async deleteEntry(id: string) {
        this.entryRepository.delete(id);
    }

    private mapPagination(entriesList: EntryList[], page: number, limit: number, total: number): EntryListPagination {
        return {
            data: entriesList,
            page,
            limit,
            total
        }
    }
}
