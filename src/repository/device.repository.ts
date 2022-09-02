import { Injectable } from '@nestjs/common';
import { Device } from '../entity/device.entity';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceRepository {
  private readonly devices: Device[];

  constructor(configService: ConfigService) {
    this.devices = configService.get('devices');
    if (!Array.isArray(this.devices) || this.devices.length === 0) {
      throw new Error('Device not found.');
    }
  }

  async find(): Promise<Device[]> {
    return this.devices;
  }

  async findOne(deviceId: string): Promise<Device> {
    return this.devices.find((device) => device.deviceId === deviceId);
  }
}
