import { Entry } from "../../../models/entry.model";
import { IEntryRepository } from "../entry.repository.interface";
import { Injectable } from "@nestjs/common";
import { EntryList } from "../../../models/entry-list.model";

@Injectable()
export class EntryRepository implements IEntryRepository {
    private entries: Entry[] = [
        {
            "id": 1,
            "user": "Joe Smith",
            "country": "UK",
            "ip": "1.2.3.4",
            "device": "Windows / Chrome 121.0",
            "tags": [
                {
                    "title": "ERROR",
                    "description": "This is a description for the ERROR tag lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "color": "#F17567"
                }
            ],
            "isDangerous": true,
            "application_hostname": "new_app",
            "timestamp": "2028-11-02T10:20:11.242Z",
            "type": "WEB"
        },
        {
            "id": 2,
            "user": "Jack Black",
            "country": "USA",
            "ip": "11.22.33.44",
            "device": "MacOs / Firefox 101.2",
            "tags": [
                {
                    "title": "OK",
                    "description": "This is a description for the OK tag",
                    "color": "#6EB72F"
                },
                {
                    "title": "NEW",
                    "description": "this is the NEW tag and it appears because lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "color": "#026FBC"
                }
            ],
            "isDangerous": false,
            "application_hostname": "new_app",
            "timestamp": "2028-11-04T15:12:46.242Z",
            "type": "WEB"
        },
        {
            "id": 3,
            "user": "Marco Rossi",
            "country": "Italy",
            "ip": "21.32.43.64",
            "device": "Android / Firefox 99.0",
            "tags": [
                {
                    "title": "KO",
                    "description": "This is a description for the KO tag",
                    "color": "#EE5341"
                },
                {
                    "title": "SUSPICIOUS",
                    "description": "This is the SUSPICIOUS tag description and lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "color": "#EE5341"
                }
            ],
            "isDangerous": true,
            "application_hostname": "another_app",
            "timestamp": "2028-11-03T11:11:43.241Z",
            "type": "MOBILE"
        }
    ];

    async findAll(page: number, limit: number): Promise<EntryList[]> {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let data = this.entries.slice(startIndex, endIndex);
        data = data.map(entry => ({
            id: entry.id,
            application_hostname: entry.application_hostname,
            timestamp: entry.timestamp,
            type: entry.type
        }))

        /*return {
            data,
            page,
            limit,
            total: this.entries.length
        }*/
        return data;
    }

    async findById(id: number): Promise<Entry> {
        return this.entries.find(entry => entry.id === id);
    }

    async create(entry: Entry): Promise<Entry> {
        entry.id = this.generateId();
        this.entries.push(entry);
        return entry;
    }

    async update(id: number, entryData: Partial<Entry>): Promise<Entry> {
        const index = this.entries.findIndex(entry => entry.id === id);
        if (index !== -1) {
            this.entries[index] = { ...this.entries[index], ...entryData };
            return this.entries[index]
        }
        return null
    }

    async delete(id: number) {
        this.entries = this.entries.filter(entry => entry.id !== id);
    }

    async getCount(): Promise<number> {
        return this.entries.length;
    }

    private generateId(): number {
        if (this.entries.length === 0) {
            return 1;
        }
        const lastId = this.entries[this.entries.length - 1].id;
        return lastId + 1;
    }
    
}