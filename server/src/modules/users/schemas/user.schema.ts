import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop({ enum: ['USER', 'ADMIN'], default: 'USER' })
  role: string;

  @Prop({ enum: ['LOCAL', 'GOOGLE', 'FACEBOOK'], default: 'LOCAL' })
  accountType: string;

  @Prop()
  isActive: boolean;

  // Dùng cho verify email hoặc reset password
  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
