import { Injectable } from '@nestjs/common'
import { Form } from '@prisma/__generated__'

import { PrismaService } from '../prisma/prisma.service'
import { UserService } from '../user/user.service'

import { CreateFormDto } from './dto/form.dto'

@Injectable()
export class FormService {
	constructor(
		private prisma: PrismaService,
		private user: UserService
	) {}

	async createForm(
		createFormDto: CreateFormDto,
		userId: string
	): Promise<Form> {
		return this.prisma.form.create({
			data: {
				userId,
				fields: {
					create: createFormDto.fields
				}
			},
			include: {
				fields: true
			}
		})
	}

	async getForm(id: string): Promise<Form> {
		return this.prisma.form.findUnique({
			where: { id },
			include: { fields: true }
		})
	}

	async patchForm(id: string, createFormDto: CreateFormDto): Promise<Form> {
		return this.prisma.form.update({
			where: { id },
			data: {
				fields: {
					create: createFormDto.fields
				}
			},
			include: {
				fields: true
			}
		})
	}
}
