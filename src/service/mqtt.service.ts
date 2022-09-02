import { Injectable, OnModuleInit } from '@nestjs/common';
import { Device } from '../entity/device.entity';
import { DeviceRepository } from '../repository/device.repository';
import { JemaRepository } from '../repository/jema.repository';
import { MqttRepository } from '../repository/mqtt.repository';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly mqttRepository: MqttRepository,
    private readonly jemaRepository: JemaRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    const devices = await this.deviceRepository.find();

    const tasks = [];
    for (const device of devices) {
      tasks.push(
        (async () => this.registerMqtt2jema(device))(),
        (async () => this.registerJema2mqtt(device))(),
      );
    }

    await Promise.all(tasks);
  }

  registerMqtt2jema(device: Device): Promise<void> {
    return this.mqttRepository.addCommandListener(device, (active) => {
      void this.jemaRepository.setActive(device.gpio, active);
    });
  }

  registerJema2mqtt(device: Device): Promise<void> {
    return this.jemaRepository.addStateListener(device.gpio, (active) => {
      void this.mqttRepository.publishState(device, active);
    });
  }
}
