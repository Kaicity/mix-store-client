import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class VerifyCodeDto {
  @ApiProperty({ example: 'nguyenminhthongitmix@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Thong123456@' })
  @IsString()
  codeId: string;
}
