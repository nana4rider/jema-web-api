import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mqtt, { AsyncMqttClient, IClientOptions, QoS } from 'async-mqtt';

const activeMessage = 'ACTIVE';
const inactiveMessage = 'INACTIVE';

@Injectable()
export class MqttRepository implements OnModuleInit {
  private readonly logger = new Logger(MqttRepository.name);

  private client: AsyncMqttClient;

  private baseTopic: string;

  private qos: QoS;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const config = this.configService.get<IClientOptions>('mqtt.broker');

    this.client = await mqtt.connectAsync(config);
    this.logger.log('MQTT Connected');

    this.qos = this.configService.get<QoS>('mqtt.qos') ?? 1;
    this.baseTopic =
      this.configService.get<string>('mqtt.baseTopic') ?? 'jema-web-api';

    await this.client.subscribe(`${this.baseTopic}/+/set`, { qos: this.qos });
  }

  async publishState(deviceId: string, active: boolean): Promise<void> {
    const topic = `${this.baseTopic}/${deviceId}/get`;
    const message = active ? activeMessage : inactiveMessage;

    return this.client.publish(topic, message, { retain: true, qos: this.qos });
  }

  addCommandListener(
    callback: (deviceId: string, active: boolean) => void,
  ): void {
    this.client.on('message', (recvTopic, payload) => {
      const pattern = new RegExp(`${this.baseTopic}/(.+?)/set`);
      const matcher = recvTopic.match(pattern);

      if (!matcher) return;

      const deviceId = matcher[1];

      switch (payload.toString()) {
        case activeMessage:
          callback(deviceId, true);
          return;
        case inactiveMessage:
          callback(deviceId, false);
          return;
        default:
        // Unsupported Message
      }
    });
  }
}
