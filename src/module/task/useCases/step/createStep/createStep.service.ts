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
import { filledArray } from '@/shared/core/utils/undefinedHelpers';

const MAX_ALLOWED_STEPS_PER_BOARD = 20;

@Injectable()
export class CreateStepService {
  constructor(
    @Inject(IStepRepositorySymbol) private readonly stepRepo: IStepRepository,
    @Inject(IBoardRepositorySymbol) private readonly boardRepo: IBoardRepository,
  ) {}

  async execute({ boardId, name }: CreateStepDTO) {
    const board = await this.boardRepo.findCompleteById(boardId);

    if (!board) {
      throw new CreateStepErrors.BoardNotFound();
    }

    if (filledArray(board.steps) && board.steps?.length >= MAX_ALLOWED_STEPS_PER_BOARD) {
      throw new CreateStepErrors.MaxStepsReached(board.name, MAX_ALLOWED_STEPS_PER_BOARD);
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
