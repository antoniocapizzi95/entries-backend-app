import { Injectable } from '@nestjs/common';
import { Entry } from '../models/entry.model';
import { EntryRepository } from '../repository/entry/mocks/entry.repository';
import { EntryListPagination } from '../models/entry-list-pagination.model';
import { EntryList } from 'src/models/entry-list.model';

@Injectable()
export class EntriesService {
    constructor(private readonly entryRepository: EntryRepository) {}

    async findAllEntries(page: number, limit: number): Promise<EntryListPagination> {
        const entries = await this.entryRepository.findAll(page, limit);
        const count = await this.entryRepository.getCount();
        return this.mapPagination(entries, page, limit, count);
    }

    async findEntryById(id: string): Promise<Entry> {
        const idNum = parseInt(id, 10);
        return this.entryRepository.findById(idNum);
    }

    async createEntry(entry: Entry): Promise<Entry> {
        entry.timestamp = new Date().toISOString();
        return this.entryRepository.create(entry);
    }

    async updateEntry(id: string, entryData: Partial<Entry>): Promise<Entry> {
        const idNum = parseInt(id, 10);
        return this.entryRepository.update(idNum, entryData);
    }

    async deleteEntry(id: string) {
        const idNum = parseInt(id, 10);
        this.entryRepository.delete(idNum);
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
