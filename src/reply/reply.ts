import { ReplyDto } from './dtos/Rely.dtos';

export interface IRelyService {
  createRely(relyParams: ReplyDto);
  deleteRely(relyParams: ReplyDto);
}
