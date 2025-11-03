import { UserRole } from '@/common/enums/role.enum';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại Không hợp lệ' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ không hợp lệ' })
  address: string;

  @IsOptional()
  @IsString({ message: 'Ảnh đại diện không hợp lệ' })
  image: string;

  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsOptional()
  role: UserRole;
}
