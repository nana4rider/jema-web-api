import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class DeviceStateDto {
  @ApiProperty()
  @IsBoolean()
  active: boolean;
}
