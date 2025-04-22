import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { IS_DEV_ENV } from './libs/common/utils/is-dev.util'
import { AuthModule } from './modules/auth/auth.module'
import { FormResponseModule } from './modules/form-response/form-response.module'
import { FormModule } from './modules/form/form.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { S3Module } from './modules/s3/s3.module'
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
		FormModule,
		S3Module,
		FormResponseModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
