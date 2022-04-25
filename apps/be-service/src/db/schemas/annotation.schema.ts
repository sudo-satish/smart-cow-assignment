import {
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Image } from './image.schema';

export type AnnotationDocument = Annotation & Document;


const annotation = {
  "type":"Annotation",
  "body":[{"type":"TextualBody","value":"ASD","purpose":"commenting"}],
  "target":{
    // "source":"http://localhost:3001/images/stream/6266f87400a14ad253d53f40/Casing.png",
    "selector":{
      "type":"FragmentSelector",
      "conformsTo":"http://www.w3.org/TR/media-frags/",
      "value":"xywh=pixel:379,190.20001220703125,121,109"
    }
  },
  // "@context":"http://www.w3.org/ns/anno.jsonld",
  // "id":"#d65432ea-198b-4e9b-b16c-71cfb91fa6bd"
};


@Schema()
export class Annotation {
  @Prop()
  type: string;

  @Prop(raw([{
    type: {type: String},
    value: {type: String},
    purpose: {type: String},
  }]))
  body: Record<string, any>;

  @Prop(raw({
    selector: { 
      type: {type: String},
      conformsTo: {type: String},
      value: {type: String}
    }
  }))
  target: Record<string, any>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Image.name })
  image: Image;
}

export const AnnotationSchema = SchemaFactory.createForClass(Annotation);
