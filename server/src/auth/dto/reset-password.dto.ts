import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class ResetPasswordDto {
  @ApiProperty({ example: 'nguyenminhthongitmix@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '162002' })
  @IsString()
  codeId: string;

  @ApiProperty({ example: 'Thong123456@' })
  @MinLength(6)
  newPassword: string;
}
