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
    const devices = await this.deviceService.find();

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
      void this.jemaService.setActive(device.gpio, active);
    });
  }

  registerJema2mqtt(device: Device): Promise<void> {
    return this.jemaService.addStateListener(device.gpio, (active) => {
      void this.mqttRepository.publishState(device, active);
    });
  }
}
