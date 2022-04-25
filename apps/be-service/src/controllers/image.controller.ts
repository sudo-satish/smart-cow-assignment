import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AnnotationService } from 'src/services/annotations.service';
import { ImageService } from 'src/services/image.service';

interface CreateImageDto {
  name: string
}

@Controller('images')
export class ImageController {
  constructor(
    private readonly service: ImageService,
    private readonly annotationService: AnnotationService
  ) {}

  @Get()
  getImages() {
    return this.service.getImages();
  }

  @Post()
  createImage(@Body() createImage: CreateImageDto) {
    return this.service.create(createImage);
  }

  @Get('/stream/:id')
  async getFile(@Res() res: Response, @Param('id') imageId: string) {
    const fileDocument = await this.service.findById(imageId);
    const file = createReadStream(join(__dirname, '../../public/uploads', fileDocument.filename));
    res.set({
      'Content-Type': fileDocument.mimetype,
      'Content-Disposition': `attachment; filename="${fileDocument.originalname}"`,
    });
    file.pipe(res);
  }

  /**
   * This API is duplicate of '/stream/:id' to make URL SEO friendly
   * So, now above API can be called as  /stream/:id/example.jpg
   *
   * @param res 
   * @param imageId 
   */
  @Get('/stream/:id/:name')
  async getFileWithName(@Res() res: Response, @Param('id') imageId: string) {
    const fileDocument = await this.service.findById(imageId);
    const file = createReadStream(join(__dirname, '../../public/uploads', fileDocument.filename));
    res.set({
      'Content-Type': fileDocument.mimetype,
      'Content-Disposition': `attachment; filename="${fileDocument.originalname}"`,
    });
    file.pipe(res);
  }

  @Delete(':imageId')
  delete(@Param('imageId') imageId: string) {
    return this.service.deleteById(imageId);
  }

  @Post(':imageId/annotations')
  createAnnotation(@Param('imageId') imageId: string, @Body() body: any) {
    console.log({
      body, imageId
    });
    
    return this.annotationService.create({
      image: imageId,
      ...body
    });
  }

  @Get(':imageId/annotations')
  getAnnotations(@Param('imageId') imageId: string) {
    return  this.annotationService.find({image: imageId});
  }
}
