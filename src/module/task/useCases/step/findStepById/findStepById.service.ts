import { Inject, Injectable } from '@nestjs/common';

import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class FindStepByIdService {
  constructor(@Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository) {}

  async execute(id: string) {
    const step = await this.stepRepo.findById(id);

    if (!step) {
      throw new GenericErrors.NotFound('Etapa não encontrada');
    }

    return step;
  }
}
