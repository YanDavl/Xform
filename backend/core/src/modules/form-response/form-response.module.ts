import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { FormResponseController } from './form-response.controller'
import { FormResponseService } from './form-response.service'

@Module({
	controllers: [FormResponseController],
	providers: [FormResponseService, PrismaService]
})
export class FormResponseModule {}
