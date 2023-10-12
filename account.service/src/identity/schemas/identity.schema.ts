import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class Identity extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String, required: true })
  password: string;
}

export type IdentityDocument = HydratedDocument<Identity>;
export const IdentitySchema = SchemaFactory.createForClass(Identity);
