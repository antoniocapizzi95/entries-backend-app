import { EntryTag } from "./entry-tag.model";

export class Entry {
    id: number;
    application_hostname?: string;
    timestamp?: string;
    type?: string;
    user?: string;
    country?: string;
    ip?: string;
    device?: string;
    tags?: EntryTag[];
    isDangerous?: boolean;
}