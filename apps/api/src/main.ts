/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .addCookieAuth('access-key')
        .setTitle('sugar-shark-api')
        .setDescription('The sugar-shark-api API description')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    const port = process.env.API_PORT || 3000
    await app.listen(port)
    Logger.log(
        `🚀 Application is running on: http://localhost:${ port }/${ globalPrefix }`,
    )
}

bootstrap()
