import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DeviceStateController } from '../controller/device-state.controller';
import { DeviceController } from '../controller/device.controller';
import { DeviceRepository } from '../repository/device.repository';
import { JemaRepository } from '../repository/jema.repository';
import { MqttRepository } from '../repository/mqtt.repository';
import { DeviceService } from '../service/device.service';
import { JemaService } from '../service/jema.service';
import { MqttService } from '../service/mqtt.service';

@Module({
  imports: [],
  providers: [
    DeviceService,
    MqttService,
    JemaService,
    DeviceRepository,
    MqttRepository,
    JemaRepository,
  ],
  controllers: [DeviceController, DeviceStateController],
})
export class DeviceModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  configure(consumer: MiddlewareConsumer) {}
}
