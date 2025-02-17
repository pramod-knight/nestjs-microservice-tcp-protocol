import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users-collection' })
export class UserEntity {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ lowercase: true, trim: true })
  email: string;

  @Prop()
  password: string;
}
export type userDocument = HydratedDocument<UserEntity>;
export const userSchema = SchemaFactory.createForClass(UserEntity);
