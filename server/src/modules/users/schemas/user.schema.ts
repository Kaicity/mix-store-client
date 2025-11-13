import { UserRole } from '@/common/enums/role.enum';
import { UserAccountType } from '@/common/enums/user-account-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: string;

  @Prop({ enum: UserAccountType, default: UserAccountType.LOCAL })
  accountType: string;

  @Prop()
  isActive: boolean;

  @Prop({})
  provider: string;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
