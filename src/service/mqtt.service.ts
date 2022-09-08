import { Injectable, OnModuleInit } from '@nestjs/common';
import { Device } from '../entity/device.entity';
import { MqttRepository } from '../repository/mqtt.repository';
import { DeviceService } from './device.service';
import { JemaService } from './jema.service';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly jemaService: JemaService,
    private readonly mqttRepository: MqttRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    this.mqttRepository.addCommandListener(async (deviceId, active) => {
      const device = await this.deviceService.findOne(deviceId);

      if (device) {
        await this.jemaService.setActive(device.gpio, active);
      }
    });

    const devices = await this.deviceService.find();

    await Promise.all(devices.map((device) => this.registerJema2mqtt(device)));
  }

  registerJema2mqtt(device: Device): Promise<void> {
    return this.jemaService.addStateListener(device.gpio, (active) => {
      void this.mqttRepository.publishState(device.deviceId, active);
    });
  }
}
