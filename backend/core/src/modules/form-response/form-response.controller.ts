import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Authorization } from '../auth/decorators/auth.decorator'
import { Authorized } from '../auth/decorators/authorized.decorator'

import { FormResponseService } from './form-response.service'

@ApiTags('forms-response')
@Controller('forms-response')
export class FormResponseController {
	constructor(private readonly formResponseService: FormResponseService) {}

	@Post(':formId/responses')
	async submitForm(
		@Param('formId') formId: string,
		@Body() body: { answers: JSON }
	) {
		return this.formResponseService.create(formId, body.answers)
	}
}
