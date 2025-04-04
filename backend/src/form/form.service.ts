import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { CreateFormDto } from './dto/form.dto'

@Injectable()
export class FormService {
	constructor(private prisma: PrismaService) {}

	async createForm(createFormDto: CreateFormDto) {
		return this.prisma.form.create({
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

	async getForm(id: string) {
		return this.prisma.form.findUnique({
			where: { id },
			include: { fields: true }
		})
	}

	async patchForm(id: string, createFormDto: CreateFormDto) {
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
