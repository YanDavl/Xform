import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

import { Authorization } from '../auth/decorators/auth.decorator'
import { Authorized } from '../auth/decorators/authorized.decorator'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	@ApiOperation({ summary: 'Получить профиль текущего пользователя' })
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId)
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	@ApiOperation({ summary: 'Получить профиль пользователя по id' })
	public async findById(@Authorized('id') userId: string) {
		return this.userService.findById(userId)
	}
}
