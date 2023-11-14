import { BangRoleGroup } from './entities/BangRoleGroup';
import { Comments } from './entities/Comments';
import { Contact } from './entities/Contact';
import { News } from './entities/News';
import { NewsCategory } from './entities/NewsCategory';
import { Posts } from './entities/Posts';
import { Reply } from './entities/Reply';
import { RoleUser } from './entities/RoleUser';
import { Users } from './entities/Users';

const entities = [
  Users,
  RoleUser,
  BangRoleGroup,
  Comments,
  Contact,
  NewsCategory,
  Posts,
  Reply,
  News,
];

export default entities;

export {
  Users,
  RoleUser,
  BangRoleGroup,
  Comments,
  Contact,
  NewsCategory,
  Posts,
  Reply,
  News,
};
