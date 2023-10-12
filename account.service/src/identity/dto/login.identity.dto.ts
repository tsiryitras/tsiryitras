import { IsNotEmpty, IsString } from 'class-validator';

export class LoginIdentityDto {
  @IsNotEmpty()
  @IsString()
  readonly userName;

  @IsNotEmpty()
  @IsString()
  readonly password;
}
