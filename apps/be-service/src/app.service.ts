import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './db/schemas/project.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Project.name) private readonly industry: Model<Project>,
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
