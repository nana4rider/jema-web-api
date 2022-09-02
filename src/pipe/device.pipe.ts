import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { DeviceService } from '../service/device.service';

@Injectable()
export class DevicePipe implements PipeTransform<string> {
  constructor(private readonly deviceService: DeviceService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: string, metadata: ArgumentMetadata) {
    const device = await this.deviceService.findOne(value);
    if (!device) throw new NotFoundException();
    return device;
  }
}
