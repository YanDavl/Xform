import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthService } from './auth.service'
import { Authorization } from './decorators/auth.decorator'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Регистрация' })
	public async register(@Req() req: Request, @Body() dto: RegisterDto) {
		return this.authService.register(req, dto)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Логин' })
	public async login(@Req() req: Request, @Body() dto: LoginDto) {
		return this.authService.login(req, dto)
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Выход из аккаунта' })
	public async logout(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.logout(req, res)
	}

	@Authorization()
	@Get('verify-session')
	@ApiOperation({ summary: 'Проверить текущую сессию' })
	verify(@Req() req: Request) {
		console.log('Session cookie:', req.cookies)
		return this.authService.verify(req)
	}
}
