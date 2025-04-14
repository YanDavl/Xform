import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Authorization } from '../auth/decorators/auth.decorator'
import { Authorized } from '../auth/decorators/authorized.decorator'

import { CreateFormDto } from './dto/form.dto'
import { FormService } from './form.service'

@ApiTags('forms')
@Controller('forms')
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Authorization()
	@Post()
	@ApiOperation({ summary: 'Создать форму с определёнными полями' })
	@ApiBody({ type: CreateFormDto })
	@ApiResponse({
		status: 200,
		description: 'Успешное создание',
		type: CreateFormDto
	})
	create(
		@Body() createFormDto: CreateFormDto,
		@Authorized('id') userId: string
	) {
		return this.formService.createForm(createFormDto, userId)
	}

	@Authorization()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.formService.getForm(id)
	}
}
