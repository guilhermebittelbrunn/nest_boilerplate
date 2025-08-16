import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListBoardDTO } from './dto/listBoard.dto';
import { ListBoardsService } from './listBoards.service';

import { BoardDTO } from '@/module/task/dto/board.dto';
import BoardMapper from '@/module/task/mappers/board.mapper';
import User from '@/module/user/domain/user/user';
import { ValidatedQuery } from '@/shared/decorators';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { ApiListResponse } from '@/shared/infra/docs/swagger/decorators/apiListResponse.decorator';
import { ListResponseDTO } from '@/shared/types/common';

@Controller('/board')
@ApiTags('board')
@UseGuards(JwtAuthGuard)
export class ListBoardsController {
  constructor(private readonly useCase: ListBoardsService) {}

  @Get()
  @ApiListResponse(BoardDTO)
  async handle(
    @GetUser() user: User,
    @ValidatedQuery() query?: ListBoardDTO,
  ): Promise<ListResponseDTO<BoardDTO>> {
    const result = await this.useCase.execute({
      ...query,
      userId: user.id.toValue(),
    });

    return {
      data: result.data.map(BoardMapper.toDTO),
      meta: result.meta,
    };
  }
}
