import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateStepService } from './createStep.service';
import { CreateStepDTO } from './dto/createStep.dto';

import StepMapper from '@/module/task/mappers/step.mapper';
import { ValidatedBody } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/step')
@ApiTags('step')
@UseGuards(JwtAuthGuard)
export class CreateStepController {
  constructor(private readonly useCase: CreateStepService) {}

  @Post('/')
  async handle(@ValidatedBody() body: CreateStepDTO): Promise<UpdateResponseDTO> {
    const step = await this.useCase.execute(body);

    return StepMapper.toDTO(step);
  }
}
