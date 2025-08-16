import { Controller, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateStepDTO } from './dto/updateStep.dto';
import { UpdateStepService } from './updateStep.service';

import { ValidatedBody, ValidatedParams } from '@/shared/decorators';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/step')
@ApiTags('step')
@UseGuards(JwtAuthGuard)
export class UpdateStepController {
  constructor(private readonly useCase: UpdateStepService) {}

  @Put('/:id')
  async handle(
    @ValidatedParams('id') id: string,
    @ValidatedBody() body: UpdateStepDTO,
  ): Promise<UpdateResponseDTO> {
    const result = await this.useCase.execute({ ...body, id });

    return { id: result };
  }
}
