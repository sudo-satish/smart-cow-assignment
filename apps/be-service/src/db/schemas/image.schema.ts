import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Project } from './project.schema';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  originalname: string;

  @Prop()
  encoding: string;

  @Prop()
  mimetype: string;

  @Prop()
  filename: string;

  @Prop()
  size: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  project: Project;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
