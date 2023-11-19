import { IsEmail, IsNumber } from 'class-validator';

export class ConfirmEmailDto {
  @IsEmail()
  email: string;
}

export class ConfirmEmailBodyDto {
  @IsNumber()
  code: number;
}
