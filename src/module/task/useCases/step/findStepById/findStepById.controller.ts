import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FindStepByIdService } from './findStepById.service';

import { StepDTO } from '@/module/task/dto/step.dto';
import StepMapper from '@/module/task/mappers/step.mapper';
import { ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';

@Controller('/step')
@ApiTags('step')
@UseGuards(JwtAuthGuard)
export class FindStepByIdController {
  constructor(private readonly useCase: FindStepByIdService) {}

  @Get('/:id')
  async handle(@ValidatedParams('id') id: string): Promise<StepDTO> {
    const result = await this.useCase.execute(id);

    return StepMapper.toDTO(result);
  }
}
