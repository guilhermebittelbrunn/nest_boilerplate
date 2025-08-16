import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateBoardService } from './createBoard.service';
import { CreateBoardDTO } from './dto/createBoard.dto';

import BoardMapper from '@/module/task/mappers/board.mapper';
import User from '@/module/user/domain/user/user';
import { ValidatedBody } from '@/shared/decorators';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwtAuth.guard';
import { UpdateResponseDTO } from '@/shared/types/common';

@Controller('/board')
@ApiTags('board')
@UseGuards(JwtAuthGuard)
export class CreateBoardController {
  constructor(private readonly useCase: CreateBoardService) {}

  @Post('/')
  async handle(@GetUser() user: User, @ValidatedBody() body: CreateBoardDTO): Promise<UpdateResponseDTO> {
    const board = await this.useCase.execute({ ...body, ownerId: user.id.toValue() });

    return BoardMapper.toDTO(board);
  }
}
