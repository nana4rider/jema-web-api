import { Body, Controller, Get, HttpStatus, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceStateDto } from '../dto/device-state.dto';
import { Device } from '../entity/device.entity';
import { DevicePipe } from '../pipe/device.pipe';
import { JemaService } from '../service/jema.service';

@Controller('devices')
@ApiTags('state')
export class DeviceStateController {
  constructor(private readonly jemaService: JemaService) {}

  @ApiParam({
    name: 'deviceId',
    description: 'Device ID',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.OK, type: DeviceStateDto })
  @ApiOperation({ summary: '状態を取得' })
  @Get(':deviceId/state')
  async getState(
    @Param('deviceId', DevicePipe) { gpio }: Device,
  ): Promise<DeviceStateDto> {
    const active = await this.jemaService.getActive(gpio);
    return { active };
  }

  @ApiParam({
    name: 'deviceId',
    description: 'Device ID',
    required: true,
    type: String,
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({ summary: '状態を更新' })
  @Put(':deviceId/state')
  async updateState(
    @Param('deviceId', DevicePipe) { gpio }: Device,
    @Body() { active }: DeviceStateDto,
  ): Promise<void> {
    await this.jemaService.setActive(gpio, active);
  }
}
