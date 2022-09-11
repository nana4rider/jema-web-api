import { Injectable } from '@nestjs/common';
import { Device } from '../entity/device.entity';

import { DeviceRepository } from '../repository/device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  find(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  findOne(deviceId: string): Promise<Device | null> {
    return this.deviceRepository.findOne(deviceId);
  }
}
