import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;

  public passwordsMatch(): boolean {
    return this.newPassword === this.confirmNewPassword;
  }
}
