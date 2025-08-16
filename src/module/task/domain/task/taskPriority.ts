import ValueObject from '@/shared/core/domain/ValueObject';
import GenericErrors from '@/shared/core/logic/genericErrors';
import Guard, { IGuardResult } from '@/shared/core/logic/guard';
import { TaskPriorityEnum } from '@/shared/types/task/task';

export interface TaskPriorityProps {
  value: TaskPriorityEnum;
}

export default class TaskPriority extends ValueObject<TaskPriorityProps> {
  private static userFriendlyName = 'prioridade da tarefa';

  private static userFriendlyTypeName = {
    [TaskPriorityEnum.LOW]: 'Baixa',
    [TaskPriorityEnum.MEDIUM]: 'Média',
    [TaskPriorityEnum.HIGH]: 'Alta',
  };

  private constructor(value: TaskPriorityProps) {
    super(value);
  }

  get value(): TaskPriorityEnum {
    return this.props.value;
  }

  get friendlyName(): string {
    return TaskPriority.userFriendlyName[this.value];
  }

  private static isValid(type: string): IGuardResult {
    const validOptions = Object.values(TaskPriorityEnum);
    return Guard.isOneOf(type, validOptions, this.userFriendlyName);
  }

  public static getFriendlyTypeName(value: TaskPriorityEnum): string {
    return this.userFriendlyTypeName[value];
  }

  public static create(type: TaskPriorityEnum): TaskPriority {
    const guardResult = Guard.againstNullOrUndefined(type, this.userFriendlyName);

    if (!guardResult.succeeded) {
      throw new GenericErrors.InvalidParam(guardResult.message);
    }

    const isValid = this.isValid(type);

    if (!isValid.succeeded) {
      throw new GenericErrors.InvalidParam(isValid.message);
    }

    return new TaskPriority({ value: type });
  }
}
