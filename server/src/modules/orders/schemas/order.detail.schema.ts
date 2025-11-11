import { Product } from '@/modules/products/schemas/product.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  menuItemOption: mongoose.Schema.Types.ObjectId;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
