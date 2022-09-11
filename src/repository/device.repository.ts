import { Injectable } from '@nestjs/common';
import { Device } from '../entity/device.entity';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceRepository {
  private readonly devices: Device[];

  constructor(configService: ConfigService) {
    const configDevices = configService.get('devices');
    if (!Array.isArray(configDevices) || configDevices.length === 0) {
      throw new Error('Device not found.');
    }
    this.devices = configDevices;
  }

  async find(): Promise<Device[]> {
    return this.devices;
  }

  async findOne(deviceId: string): Promise<Device | null> {
    return this.devices.find((device) => device.deviceId === deviceId) ?? null;
  }
}
