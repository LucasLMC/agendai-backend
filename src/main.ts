import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableShutdownHooks()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  const config = new DocumentBuilder()
    .setTitle('Agendai API')
    .setDescription('The Agendai API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('agendai')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  SwaggerModule.setup('docs', app, document)

  await app.listen(process.env.PORT || 8080)
}
bootstrap()
