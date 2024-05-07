import { EntryList } from "../../models/entry-list.model";
import { Entry } from "../../models/entry.model";

export interface IEntryRepository {
    findAll(page: number, limit: number): Promise<EntryList[]>
    findById(id: string): Promise<Entry | null>
    create(entry: Entry): Promise<Entry>
    update(id: string, entryData: Partial<Entry>): Promise<Entry>
    delete(id: string): void
    getCount(): Promise<number>
}