import { Users } from 'src/utils/typeorm';
import { PayloadgenerateToken, ValidateUserDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredentials: ValidateUserDetails): Promise<Users | null>;
  generateToken(userName: PayloadgenerateToken): Promise<any>;
  validateToken(token: string): Promise<any>;
}
