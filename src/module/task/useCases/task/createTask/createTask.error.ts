import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace CreateTaskErrors {
  export class StepNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Etapa não encontrada`);
    }
  }

  export class AssigneeNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Usuário não encontrado`);
    }
  }

  export class MaxTasksReached extends GenericErrors.InvalidParam {
    constructor(stepName: string, maxTasks: number) {
      super(`Máximo de ${maxTasks} tarefas atingido para a etapa ${stepName}`);
    }
  }
}

export default CreateTaskErrors;
