import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../db/schemas/image.schema';
import DBService from './db.service';

@Injectable()
export class ImageService extends DBService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {
    super(imageModel);
  }

  async getImages() {
    return this.find({});
  }

  async streamFile(@Param('id') imageId) {

  }

  
}
