import { EntryList } from "./entry-list.model";


export class EntryListPagination {
    data: EntryList[];
    page: number;
    limit: number;
    total: number;
}