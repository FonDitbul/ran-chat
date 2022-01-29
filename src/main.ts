import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { dateParserHelper } from './common/helper/date-parser.helper';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { dayBeforeHelper } from './common/helper/day-before.helper';
import { imageServerHelper } from './common/helper/image-server.helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('랜덤채팅 어플리케이션')
    .setDescription('ran-chat 어플리케이션 api 문서')
    .setVersion('1.0')
    .addTag('RandomChatting')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //view, hbs 템플릿 설정
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  hbs.registerHelper('dateParser', dateParserHelper);
  hbs.registerHelper('dayBefore', dayBeforeHelper);
  hbs.registerHelper('imageServer', imageServerHelper);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
