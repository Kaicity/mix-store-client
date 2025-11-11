import { OrderStatus } from '@/common/enums/order.enum';
import { PaymentMethod } from '@/common/enums/payment-methob.enum';
import { Agency } from '@/modules/agencies/schema/agency.entity';
import { OrderDetail } from '@/modules/orders/schemas/order.detail.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Agency.name })
  agency: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [OrderDetail], required: true })
  items: OrderDetail[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  address: string;

  @Prop({ enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod;

  @Prop({
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
