import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/services/image.service';
import { ProjectService } from 'src/services/project.service';

interface CreateProjectDto {
  name: string
}

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly service: ProjectService,
    private readonly imageService: ImageService
  ) {}

  @Get()
  getProjects() {
    return this.service.getProjects();
  }

  @Post()
  createProject(@Body() createProject: CreateProjectDto) {
    console.log({createProject});
    
    return this.service.create(createProject);
  }

  @Get(':projectId/images')
  listImages(@Param('projectId') projectId: string) {
    return this.imageService.find({project: projectId});
  }

  @Delete(':projectId')
  delete(@Param('projectId') projectId: string) {
    return this.service.deleteById(projectId);
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.service.findById(projectId);
  }

  @Post(':projectId/upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Param('projectId') projectId: string) {
    return Promise.all(files.map((file) => this.imageService.create(
      {...file, project: projectId}
    )));
  }
}
