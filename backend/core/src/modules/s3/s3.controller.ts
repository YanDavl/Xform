import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { S3Service } from './s3.service';
  import { FormService } from '../form/form.service';
  import { Authorized } from '../auth/decorators/authorized.decorator';
  import { UploadBackgroundDto } from './dto/upload.dto';
  
  @Controller('upload')
  export class UploadController {
    constructor(
      private readonly s3Service: S3Service,
      private readonly formService: FormService,
    ) {}
  
    @Post('background')
    @UseInterceptors(FileInterceptor('file'))
    async uploadBackground(
      @UploadedFile() file: Express.Multer.File,
      @Authorized('id') userId: string,
      @Body() body: UploadBackgroundDto,
    ) {
      const { formId } = body;
  

      const form = await this.formService.getForm(formId);
      if (form.userId !== userId) {
        throw new Error('Доступ запрещен');
      }
  
      const key = await this.s3Service.uploadFile(file, userId, formId);
      return {
        url: `http://localhost:9000/form-backgrounds/${key}`,
      };
    }
  }
  