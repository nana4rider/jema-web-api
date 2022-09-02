import { ApiProperty } from '@nestjs/swagger';
import { Gpio } from './type/gpio.type';

export class Device {
  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  deviceName: string;

  @ApiProperty()
  gpio: Gpio;
}
