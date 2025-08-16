import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteBoardService } from './deleteBoard.service';

import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/board')
@ApiTags('board')
@UseGuards(JwtAuthGuard)
export class DeleteBoardController {
  constructor(private readonly useCase: DeleteBoardService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@ValidatedParams('id') id: string): Promise<void> {
    await this.useCase.execute(id);
  }
}
