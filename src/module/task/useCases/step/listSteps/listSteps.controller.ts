import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListStepsDTO } from './dto/listSteps.dto';
import { ListStepsService } from './listSteps.service';

import { StepDTO } from '@/module/task/dto/step.dto';
import StepMapper from '@/module/task/mappers/step.mapper';
import { ValidatedQuery } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { ApiListResponse } from '@/shared/infra/docs/swagger/decorators/apiListResponse.decorator';
import { ListResponseDTO } from '@/shared/types/common';

@Controller('/step')
@ApiTags('step')
@UseGuards(JwtAuthGuard)
export class ListStepsController {
  constructor(private readonly useCase: ListStepsService) {}

  @Get()
  @ApiListResponse(StepDTO)
  async handle(@ValidatedQuery() query?: ListStepsDTO): Promise<ListResponseDTO<StepDTO>> {
    const result = await this.useCase.execute(query);

    return {
      data: result.data.map(StepMapper.toDTO),
      meta: result.meta,
    };
  }
}
