import { Module } from '@nestjs/common'

import { UserService } from '../user/user.service'

import { FormController } from './form.controller'
import { FormService } from './form.service'

@Module({
	controllers: [FormController],
	providers: [FormService, UserService]
})
export class FormModule {}
