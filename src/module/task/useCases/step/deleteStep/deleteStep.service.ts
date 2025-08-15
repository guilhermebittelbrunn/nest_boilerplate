import { Inject, Injectable } from '@nestjs/common';

import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import GenericErrors from '@/shared/core/logic/genericErrors';

@Injectable()
export class DeleteStepService {
  constructor(@Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository) {}

  async execute(id: string) {
    const deleted = await this.stepRepo.delete(id);

    if (!deleted) {
      throw new GenericErrors.NotFound(`Etapa não encontrada`);
    }
  }
}
