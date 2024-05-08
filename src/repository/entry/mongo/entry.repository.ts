import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry as EntryMongo, EntryDocument } from './schemas/entry.schema';
import { IEntryRepository } from '../entry.repository.interface';
import { EntryList } from '../../../models/entry-list.model';
import { Entry } from '../../../models/entry.model';

@Injectable()
export class EntryRepository implements IEntryRepository {
    constructor(@InjectModel(EntryMongo.name) private entryModel: Model<EntryDocument>) {}

    async findAll(page: number, limit: number): Promise<EntryList[]> {
        const documents = await this.entryModel.find().select('id application_hostname timestamp type').skip((page - 1) * limit).limit(limit).exec();
        return this.mapEntryList(documents);
    }

    async findById(id: string): Promise<Entry | null> {
        const document = await this.entryModel.findOne({ id }).exec();
        return this.mapEntry(document);
    }

    async create(entryData: Entry): Promise<Entry> {
        const createdEntry = new this.entryModel(entryData);
        const document = await createdEntry.save();
        return this.mapEntry(document);
    }

    async update(id: string, entryData: Partial<Entry>): Promise<Entry> {
        const document = await this.entryModel.findOneAndUpdate({ id }, entryData, { new: true }).exec();
        return this.mapEntry(document);
    }

    async delete(id: string): Promise<void> {
        await this.entryModel.deleteOne({ id }).exec();
    }

    async getCount(): Promise<number> {
        return this.entryModel.countDocuments();
    }

    private mapEntryList(data: any): EntryList[] {
        return data.map(entry => ({
            id: entry.id,
            application_hostname: entry.application_hostname,
            timestamp: entry.timestamp,
            type: entry.type
        }))
    }

    private mapEntry(data: any): Entry {
        return {
            id: data.id,
            application_hostname: data.application_hostname,
            timestamp: data.timestamp,
            type: data.type,
            user: data.user,
            country: data.country,
            ip: data.ip,
            device: data.device,
            tags: data.tags,
            isDangerous: data.isDangerous
        }
    }
}