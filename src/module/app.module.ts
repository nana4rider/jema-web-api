import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/yaml';
import { AppController } from '../controller/app.controller';
import { DeviceModule } from './device.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
