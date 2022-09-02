import { Injectable } from '@nestjs/common';
import { Gpio } from '../entity/type/gpio.type';
import { JemaRepository } from '../repository/jema.repository';

@Injectable()
export class JemaService {
  constructor(private readonly jemaRepository: JemaRepository) {}

  getActive(gpio: Gpio): Promise<boolean> {
    return this.jemaRepository.getActive(gpio);
  }

  setActive(gpio: Gpio, active: boolean): Promise<void> {
    return this.jemaRepository.setActive(gpio, active);
  }
}
