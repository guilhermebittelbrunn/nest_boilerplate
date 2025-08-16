import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteTaskService } from './deleteTask.service';

import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/task')
@ApiTags('task')
@UseGuards(JwtAuthGuard)
export class DeleteTaskController {
  constructor(private readonly useCase: DeleteTaskService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@ValidatedParams('id') id: string): Promise<void> {
    await this.useCase.execute(id);
  }
}
