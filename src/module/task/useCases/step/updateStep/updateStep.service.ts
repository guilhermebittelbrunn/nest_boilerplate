import { Inject, Injectable } from '@nestjs/common';

import { UpdateStepDTO } from './dto/updateStep.dto';
import UpdateStepErrors from './updateStep.error';

import Step from '@/module/task/domain/step';
import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';
import { coalesce, isEmpty } from '@/shared/core/utils/undefinedHelpers';

@Injectable()
export class UpdateStepService {
  constructor(@Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository) {}

  async execute(dto: UpdateStepDTO) {
    const currentStep = await this.stepRepo.findById(dto.id);

    if (!currentStep) {
      throw new UpdateStepErrors.NotFoundError();
    }

    if (!isEmpty(dto.name)) {
      const stepWithSameName = await this.stepRepo.findByIdentifier(dto.name, currentStep.boardId);

      if (stepWithSameName) {
        throw new UpdateStepErrors.NameAlreadyInUse(dto.name);
      }
    }

    const step = Step.create(
      {
        name: coalesce(dto.name, currentStep.name),
        boardId: currentStep.boardId,
      },
      new UniqueEntityID(dto.id),
    );

    return this.stepRepo.update(step);
  }
}
