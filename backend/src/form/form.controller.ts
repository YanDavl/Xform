import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateFormDto } from './dto/form.dto'
import { FormService } from './form.service'

@ApiTags('forms')
@Controller('forms')
export class FormController {
	constructor(private readonly formService: FormService) {}

	@Post()
	@ApiOperation({ summary: 'Создать форму с определёнными полями' })
	@ApiBody({ type: CreateFormDto })
	@ApiResponse({ status: 200, description: 'Успешное создание' })
	create(@Body() createFormDto: CreateFormDto) {
		return this.formService.createForm(createFormDto)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.formService.getForm(id)
	}
}
