import { NestFactory } from '@nestjs/core'
import { type NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app/app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.setGlobalPrefix('api')

	await app.listen(process.env.APP_PORT || 3000)
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap()
