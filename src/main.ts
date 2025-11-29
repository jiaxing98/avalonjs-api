import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.enableVersioning({
    type: VersioningType.URI, // Or HEADER, MEDIA_TYPE
    prefix: 'v',
  })
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Avalonjs')
    .setDescription(
      'A social deduction board game where 5 to 10 players are secretly divided into the loyal servants of Arthur (Good) and the minions of Mordred (Evil). '
    )
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, documentFactory)

  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/swagger`)
}

bootstrap()
