import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { FormService } from '../form/form.service';
import { env } from 'process';

@Injectable()
export class S3Service {
    constructor(private readonly formService: FormService) {}
  private s3 = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://localhost:9000',
    credentials: {
      accessKeyId: env.MINIO_ROOT_USER,
      secretAccessKey:  env.MINIO_ROOT_PASSWORD,
    },
    forcePathStyle: true,
  });


  async getSignedUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
        Bucket: 'form-backgrounds',
        Key: key,
        ContentType: contentType,
      });

    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  }
}
