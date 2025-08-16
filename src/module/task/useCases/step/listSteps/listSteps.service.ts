import { Inject, Injectable } from '@nestjs/common';

import { ListStepsDTO } from './dto/listSteps.dto';

import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';

@Injectable()
export class ListStepsService {
  constructor(@Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository) {}

  async execute(dto: ListStepsDTO) {
    return this.stepRepo.list(dto);
  }
}
