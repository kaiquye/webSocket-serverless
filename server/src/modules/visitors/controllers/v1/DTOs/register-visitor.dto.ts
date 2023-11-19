import { IsEmail, IsString } from 'class-validator';

export class RegisterVisitorDtoBody {
  // @IsEmail(null, { message: 'mail is not valid' })
  @IsString()
  readonly email: string;
}
