import { Agency } from '@/modules/agencies/schema/agency.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Agency.name })
  agency: mongoose.Schema.Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
