import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace UpdateBoardErrors {
  export class NotFoundError extends GenericErrors.NotFound {
    constructor() {
      super(`Quadro não encontrado`);
    }
  }

  export class NameAlreadyInUse extends GenericErrors.Conflict {
    constructor(name: string) {
      super(`Nome já em uso: ${name}`);
    }
  }
}

export default UpdateBoardErrors;
