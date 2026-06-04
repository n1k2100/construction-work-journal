import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import 'nestjs-zod'
import 'reflect-metadata'

import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.set('query parser', 'extended')
  app.enableCors()
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Журнал строительных работ')
    .setDescription('Документация API строительного журнала')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.PORT ?? 3990
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}/api`)
}

bootstrap()
