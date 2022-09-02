import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mqtt, { IClientOptions, MqttClient } from 'mqtt';
import { Device } from '../entity/device.entity';

const activeMessage = 'ACTIVE';
const inactiveMessage = 'INACTIVE';

@Injectable()
export class MqttRepository {
  private readonly client: MqttClient;

  private readonly baseTopic: string;

  constructor(configService: ConfigService) {
    const config = configService.get<IClientOptions>('mqtt.broker');
    this.client = mqtt.connect(config);
    this.baseTopic = configService.get<string>('mqtt.baseTopic');
  }

  async publishState(device: Device, active: boolean): Promise<void> {
    const topic = `${this.baseTopic}/${device.deviceId}/get`;
    const message = active ? activeMessage : inactiveMessage;

    return new Promise<void>((resolve, reject) => {
      this.client.publish(topic, message, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  async addCommandListener(
    device: Device,
    listener: (active: boolean) => void,
  ): Promise<void> {
    const topic = `${this.baseTopic}/${device.deviceId}/set`;

    return new Promise<void>((resolve, reject) => {
      this.client.subscribe(topic, (err) => {
        if (err) {
          reject(err);
          return;
        }

        this.client.on('message', (recvTopic, payload) => {
          if (recvTopic !== topic) {
            return;
          }

          switch (payload.toString()) {
            case activeMessage:
              listener(true);
              return;
            case inactiveMessage:
              listener(false);
              return;
            default:
            // Unsupported Message
          }
        });

        resolve();
      });
    });
  }
}
