import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Device } from '../entity/device.entity';
import { DevicePipe } from '../pipe/device.pipe';
import { DeviceService } from '../service/device.service';

@Controller('devices')
@ApiTags('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiResponse({ status: HttpStatus.OK, type: Device, isArray: true })
  @ApiOperation({ summary: 'デバイスの一覧を取得' })
  @Get()
  async index(): Promise<Device[]> {
    return this.deviceService.find();
  }

  @ApiParam({
    name: 'deviceId',
    description: 'Device ID',
    required: true,
    type: Number,
  })
  @ApiResponse({ status: HttpStatus.OK, type: Device })
  @ApiOperation({ summary: 'デバイスの詳細を取得' })
  @Get(':deviceId')
  async findOne(
    @Param('deviceId', DevicePipe) device: Device,
  ): Promise<Device> {
    return device;
  }
}
