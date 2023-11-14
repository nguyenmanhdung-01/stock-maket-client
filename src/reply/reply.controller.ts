import { Controller, Inject, Post, Body } from '@nestjs/common';
import { Routes, Services } from 'src/utils/contants';
import { IRelyService } from './reply';
import { ReplyDto } from './dtos/Rely.dtos';

@Controller(Routes.REPLY)
export class ReplyController {
  constructor(
    @Inject(Services.REPLY) private readonly relyService: IRelyService,
  ) {}

  @Post()
  createRely(@Body() replyDto: ReplyDto) {
    // console.log(relyDto);

    return this.relyService.createRely(replyDto);
  }
}
