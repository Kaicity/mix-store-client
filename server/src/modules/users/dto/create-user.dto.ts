import { UserRole } from '@/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'Nguyễn Minh Thông' })
  name: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @ApiProperty({ example: 'nguyenminhthongitmix@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Abc@12345', description: 'Mật khẩu người dùng' })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu không được vượt quá 32 ký tự' })
  @Matches(/^(?=.*[a-z])/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ thường' })
  @Matches(/^(?=.*[A-Z])/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa' })
  @Matches(/^(?=.*\d)/, { message: 'Mật khẩu phải chứa ít nhất 1 chữ số' })
  @Matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (@$!%*?&)',
  })
  password: string;

  @IsOptional()
  @Matches(/^(0|\+84)[0-9]{9}$/, { message: 'Số điện thoại không hợp lệ' })
  @ApiProperty({ example: '0909585806' })
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
