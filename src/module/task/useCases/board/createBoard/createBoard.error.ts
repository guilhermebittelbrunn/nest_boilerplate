import GenericErrors from '@/shared/core/logic/genericErrors';

export namespace CreateBoardErrors {
  export class BoardAlreadyExists extends GenericErrors.Conflict {
    constructor(name: string) {
      super(`Já existe um quadro com o nome ${name}`);
    }
  }
}

export default CreateBoardErrors;
