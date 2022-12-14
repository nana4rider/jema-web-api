import { Injectable } from '@nestjs/common';
import { JEM1427Gpio } from 'jem1427-gpio-ts';
import { Gpio } from '../entity/type/gpio.type';

@Injectable()
export class JemaRepository {
  private readonly modules: Map<number, JEM1427Gpio>;

  constructor() {
    this.modules = new Map();
  }

  private async getModule({ monitor, control }: Gpio): Promise<JEM1427Gpio> {
    let module = this.modules.get(monitor);
    if (module) {
      return module;
    }

    module = new JEM1427Gpio(monitor, control);
    await module.init();

    this.modules.set(monitor, module);

    return module;
  }

  async addStateListener(
    gpio: Gpio,
    callback: (active: boolean) => void,
  ): Promise<void> {
    const module = await this.getModule(gpio);
    module.on('change', callback);
  }

  async getActive(gpio: Gpio): Promise<boolean> {
    const module = await this.getModule(gpio);
    return module.getMonitor();
  }

  async setActive(gpio: Gpio, active: boolean): Promise<void> {
    const module = await this.getModule(gpio);
    const currentActive = await module.getMonitor();

    if (active !== currentActive) {
      await module.sendControl();
    }
  }
}
