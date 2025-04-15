import { Module } from '@nestjs/common'

import { UserService } from '../user/user.service'
import { FormService } from '../form/form.service'
import { UploadController } from './s3.controller'
import { S3Service } from './s3.service'


@Module({
	controllers: [UploadController],
	providers: [FormService, UserService, S3Service]
})
export class S3Module {}
