import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyDocument = HydratedDocument<Agency>;

@Schema({ timestamps: true })
export class Agency {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  rating: number;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
