import { IsUUID } from 'class-validator';

export class UploadBackgroundDto {
  @IsUUID()
  formId: string;
}
