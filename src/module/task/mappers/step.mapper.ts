import { StepModel } from '@prisma/client';

import TaskMapper, { TaskModelWithRelations } from './task.mapper';

import Step from '../domain/step';
import { Tasks } from '../domain/task/tasks';
import { StepDTO } from '../dto/step.dto';

import Mapper from '@/shared/core/domain/Mapper';
import UniqueEntityID from '@/shared/core/domain/UniqueEntityID';

export interface StepModelWithRelations extends StepModel {
  tasks?: TaskModelWithRelations[];
}

class BaseStepMapper extends Mapper<Step, StepModelWithRelations, StepDTO> {
  toDomain(step: StepModelWithRelations): Step {
    return Step.create(
      {
        name: step.name,
        boardId: new UniqueEntityID(step.boardId),
        createdAt: step.createdAt,
        updatedAt: step.updatedAt,
        deletedAt: step.deletedAt,
        tasks: Tasks.create(step.tasks?.map(TaskMapper.toDomain)),
      },
      new UniqueEntityID(step.id),
    );
  }

  async toPersistence(step: Step): Promise<StepModel> {
    return {
      id: step.id.toValue(),
      name: step.name,
      boardId: step.boardId.toValue(),
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      deletedAt: step.deletedAt,
    };
  }

  toDTO(step: Step): StepDTO {
    return {
      id: step.id.toValue(),
      name: step.name,
      boardId: step.boardId.toValue(),
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      deletedAt: step.deletedAt,
    };
  }
}

const StepMapper = new BaseStepMapper();

export default StepMapper;
