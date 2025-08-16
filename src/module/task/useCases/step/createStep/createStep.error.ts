import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace CreateStepErrors {
  export class BoardNotFound extends GenericErrors.NotFound {
    constructor() {
      super(`Quadro não encontrado`);
    }
  }

  export class StepAlreadyExists extends GenericErrors.Conflict {
    constructor(name: string, boardName: string) {
      super(`Já existe uma etapa com o nome ${name} no quadro ${boardName}`);
    }
  }

  export class MaxStepsReached extends GenericErrors.Conflict {
    constructor(boardName: string, maxSteps: number) {
      super(`O quadro ${boardName} já atingiu o número máximo de etapas permitidas (${maxSteps})`);
    }
  }
}

export default CreateStepErrors;
