import { EntryList } from "../../models/entry-list.model";
import { Entry } from "../../models/entry.model";

export interface IEntryRepository {
    findAll(page: number, limit: number): Promise<EntryList[]>
    findById(id: number): Promise<Entry>
    create(entry: Entry): Promise<Entry>
    update(id: number, entryData: Partial<Entry>): Promise<Entry>
    delete(id: number): void
    getCount(): Promise<number>
}