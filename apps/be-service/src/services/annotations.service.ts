import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Annotation } from '../db/schemas/annotation.schema';
import DBService from './db.service';

@Injectable()
export class AnnotationService extends DBService {
  constructor(
    @InjectModel(Annotation.name) private readonly annotationModel: Model<Annotation>,
  ) {
    super(annotationModel);
  }

  async getAnnotations() {
    return this.find({});
  }

  async streamFile(@Param('id') annotationId) {

  }
}
