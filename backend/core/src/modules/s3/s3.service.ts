import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: 'us-east-1',
    endpoint: 'http://minio:9000',
    credentials: {
      accessKeyId: 'minio',
      secretAccessKey: 'minio123',
    },
    forcePathStyle: true,
  });

  async uploadFile(file: Express.Multer.File, userId: string, formId: string): Promise<string> {
    const fileKey = `${userId}/${formId}/${uuidv4()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: 'form-backgrounds',
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    return fileKey;
  }
}
