import { UserRole } from '@/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @ApiProperty({ example: 'nguyenvana' })
  name: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @ApiProperty({ example: 'nguyenminhthongitmix@gmail.com' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @ApiProperty({ example: '12345678' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại Không hợp lệ' })
  @ApiProperty({ example: '0703338458' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ không hợp lệ' })
  @ApiProperty({ example: '317 Nguyễn Văn Luông TPHCM' })
  address: string;

  @IsOptional()
  @IsString({ message: 'Ảnh đại diện không hợp lệ' })
  @ApiProperty({ example: 'https://anh1.png' })
  image: string;

  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsOptional()
  @ApiProperty({ enum: [UserRole.ADMIN, UserRole.USER], default: UserRole.USER })
  role: UserRole;
}
