import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace UpdateTaskErrors {
  export class TaskNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Tarefa não encontrada`);
    }
  }

  export class StepNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Etapa não encontrada`);
    }
  }

  export class MaxTasksReached extends GenericErrors.Conflict {
    constructor(stepName: string, maxTasks: number) {
      super(`A etapa ${stepName} já atingiu o limite de tarefas permitidas (${maxTasks})`);
    }
  }

  export class AssigneeNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Usuário não encontrado`);
    }
  }
}

export default UpdateTaskErrors;
