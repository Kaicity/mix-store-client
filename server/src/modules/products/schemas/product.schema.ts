import { ProductTag } from '@/common/enums/product.enum';
import { Category } from '@/modules/categories/schemas/category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  shortDescription?: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: [String], default: [] })
  sizes: string[];

  @Prop({ type: [String], default: [] })
  colors: string[];

  @Prop({ type: Map, of: String, default: {} })
  images: Record<string, string>;

  @Prop({ enum: ProductTag, default: null })
  tag?: ProductTag;

  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name, required: false })
  categoryId?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
