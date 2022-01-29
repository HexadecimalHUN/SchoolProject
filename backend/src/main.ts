import {Logger, ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication ,NestFactory } from '@nestjs/core';
import { AppModule } from  './app/app.mudle';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get (ConfigService);
  
  //Using pipe to validate data.
  //If data == correct then pass
  //Else: throw exception
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  //Setting up basic server settings and listening in port
  const port = configService.get<number>('server.port', 3000);
  await app.listen(port, () => {
    Logger.log(
      `Listening at http://localhost:${port}/${globalPrefix}`,
      NestApplication.name,
    );
  });
}
bootstrap();
