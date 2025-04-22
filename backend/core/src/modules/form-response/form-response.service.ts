import { Injectable } from '@nestjs/common'
import { Form } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'

@Injectable()
export class FormResponseService {
	constructor(private prisma: PrismaService) {}

	async create(formId: string, answers: any) {
		return this.prisma.formResponse.create({
			data: {
				formId,
				answers
			}
		})
	}
}
