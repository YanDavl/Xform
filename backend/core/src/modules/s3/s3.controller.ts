import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';
import { v4 as uuidv4 } from 'uuid';
import { Authorization } from '../auth/decorators/auth.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Authorization()
  @Get('signed-url')
  async getSignedUrl(@Query('formId') formId: string, @Query('fileName') fileName: string) {
    const key = `${formId}/${uuidv4()}-${fileName}`;
    const signedUrl = await this.s3Service.getSignedUrl(key, 'image/jpeg');

    return {
      url: signedUrl,
      key,
    };
  }
}
