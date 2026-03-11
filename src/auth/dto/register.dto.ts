import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Length(3, 30)
  name: string;

  @IsNotEmpty()
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username chỉ được chứa chữ, số và _',
  })
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 32)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
    message: 'Password phải có chữ và số',
  })
  password: string;
}
