import { userDocument } from '../entities/user.entity';

export class userResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  constructor(user: userDocument) {
    this.id = user._id.toString();
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
  }
  static fromArray(users: userDocument[]): userResponseDto[] {
    return users.map(user => new userResponseDto(user));
  }
}
