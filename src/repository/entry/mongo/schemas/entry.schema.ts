import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryDocument = Entry & Document;

@Schema()
export class Entry {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    user: string;

    @Prop()
    country: string;

    @Prop()
    ip: string;

    @Prop()
    device: string;

    @Prop([{ title: String, description: String, color: String }])
    tags: { title: string, description: string, color: string }[];

    @Prop()
    isDangerous: boolean;

    @Prop({ required: true })
    application_hostname: string;

    @Prop({ required: true })
    timestamp: string;

    @Prop({ required: true })
    type: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);