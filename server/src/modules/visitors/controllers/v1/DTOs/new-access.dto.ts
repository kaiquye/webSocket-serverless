import { IsEmail, IsString } from 'class-validator';

export class NewAccessDtoBody {
  @IsString()
  email: string;
}
