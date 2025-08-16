import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace UpdateStepErrors {
  export class NotFoundError extends GenericErrors.NotFound {
    constructor() {
      super(`Etapa não encontrada`);
    }
  }

  export class NameAlreadyInUse extends GenericErrors.Conflict {
    constructor(name: string) {
      super(`Nome já em uso: ${name}`);
    }
  }
}

export default UpdateStepErrors;
