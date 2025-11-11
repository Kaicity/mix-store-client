import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  slug: string;

  @Prop()
  desctiptions: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
