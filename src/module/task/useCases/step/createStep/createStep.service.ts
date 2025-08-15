import { Inject, Injectable } from '@nestjs/common';

import CreateStepErrors from './createStep.error';
import { CreateStepDTO } from './dto/createStep.dto';

import Step from '@/module/task/domain/step';
import {
  IBoardRepository,
  IBoardRepositorySymbol,
} from '@/module/task/repositories/board.repository.interface';
import { IStepRepository, IStepRepositorySymbol } from '@/module/task/repositories/step.repository.interface';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

@Injectable()
export class CreateStepService {
  constructor(
    @Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository,
    @Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository,
  ) {}

  async execute({ boardId, name }: CreateStepDTO) {
    const board = await this.boardRepo.findById(boardId);

    if (!board) {
      throw new CreateStepErrors.BoardNotFound();
    }

    const stepWithSameName = await this.stepRepo.findByIdentifier(name, boardId);

    if (stepWithSameName) {
      throw new CreateStepErrors.StepAlreadyExists(name, board.name);
    }

    const step = Step.create({
      name,
      boardId: UniqueEntityID.create(boardId),
    });

    return this.stepRepo.create(step);
  }
}
