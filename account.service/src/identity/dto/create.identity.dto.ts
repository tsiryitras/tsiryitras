import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIdentityDto {
  @IsNotEmpty({ message: 'Le champ name doit être remplie' })
  @IsString()
  readonly name;

  @IsNotEmpty({ message: 'Le champ userName doit être remplie' })
  @IsString()
  readonly userName;

  @IsNotEmpty({ message: 'Le champ password doit être remplie' })
  @IsString()
  readonly password;
}
