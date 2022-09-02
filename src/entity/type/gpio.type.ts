import { ApiProperty } from '@nestjs/swagger';

export class Gpio {
  @ApiProperty()
  monitor: number;

  @ApiProperty()
  control: number;
}
