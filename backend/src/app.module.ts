import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { AuthModule } from './modules/auth/auth.module'
import { FormModule } from './modules/form/form.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		FormModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
