import { Controller, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeleteStepService } from './deleteStep.service';

import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/step')
@ApiTags('step')
@UseGuards(JwtAuthGuard)
export class DeleteStepController {
  constructor(private readonly useCase: DeleteStepService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@ValidatedParams('id') id: string): Promise<void> {
    await this.useCase.execute(id);
  }
}
