import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../db/schemas/project.schema';
import DBService from './db.service';

@Injectable()
export class ProjectService extends DBService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {
    super(projectModel);
  }

  async getProjects() {
    return this.find({});
  }
}
