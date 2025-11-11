import { Agency } from '@/modules/agencies/schema/agency.entity';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Agency.name })
  agency: mongoose.Schema.Types.ObjectId;

  @Prop()
  rating: number;

  @Prop()
  image: string;

  @Prop()
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
