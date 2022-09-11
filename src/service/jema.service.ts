import { Injectable } from '@nestjs/common';
import { Gpio } from '../entity/type/gpio.type';
import { JemaRepository } from '../repository/jema.repository';

@Injectable()
export class JemaService {
  constructor(private readonly jemaRepository: JemaRepository) {}

  addStateListener(
    gpio: Gpio,
    callback: (active: boolean) => void,
  ): Promise<void> {
    return this.jemaRepository.addStateListener(gpio, callback);
  }

  getActive(gpio: Gpio): Promise<boolean> {
    return this.jemaRepository.getActive(gpio);
  }

  setActive(gpio: Gpio, active: boolean): Promise<void> {
    return this.jemaRepository.setActive(gpio, active);
  }
}
