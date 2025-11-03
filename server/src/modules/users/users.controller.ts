import { JwtAuthGuard } from '@/common/auth/auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/role.enum';
import { HTTP_RESPONSE } from '@/common/helpers/response.helper';
import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';
import { paginate } from '@/common/helpers/paginate';
import { RolesGuard } from '@/common/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-account')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createNewAccount(createUserDto);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }
    return HTTP_RESPONSE(result.data, 'Tạo tài khoản thành công', HttpStatus.CREATED);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.usersService.signIn(signInDto);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return HTTP_RESPONSE(result.data, 'Đăng nhập thành công', HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('get-users')
  async getAll(@Req() req: Request) {
    const { page, limit, skip, search } = paginate(req);
    const { role, isActive } = req.query;

    const result = await this.usersService.getAllUsers({ page, limit, skip, search, role: role as string });

    return HTTP_RESPONSE(result.data, 'Lấy danh sách người đùng thành công', HttpStatus.OK);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.STAFF)
  // @Get('get-user')
  // async getUser(@Query('userId') userId: string) {
  //   const result = await firstValueFrom(this.authClient.send(AUTH_PATTERNS.GET_USER, userId));

  //   if (!result.success) {
  //     throw new BadRequestException(result.error);
  //   }

  //   return HTTP_RESPONSE(result.data, 'Lấy chi tiết người dùng thành công', HttpStatus.OK);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('change-password')
  // async changePassword(@Body() dto: SignInDto) {
  //   const result = await firstValueFrom(this.authClient.send(AUTH_PATTERNS.CHANGE_PASSWORD, dto));

  //   if (!result.success) {
  //     throw new BadRequestException(result.error);
  //   }

  //   return HTTP_RESPONSE(result.data, 'Đổi mật khẩu thành công', HttpStatus.ACCEPTED);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('update-account/:id')
  // async updateUser(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
  //   const result = await firstValueFrom(this.authClient.send(AUTH_PATTERNS.UPDATE_ACCOUNT, { userId, ...dto }));

  //   if (!result.success) {
  //     throw new BadRequestException(result.error);
  //   }

  //   return HTTP_RESPONSE(result.data, 'Đổi mật khẩu thành công', HttpStatus.OK);
  // }

  // // -----------Test-----------------
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  // @Get('remove-system') //gion nha :))
  // getAdminData() {
  //   return 'kêu admin nó làm đi';
  // }
}
