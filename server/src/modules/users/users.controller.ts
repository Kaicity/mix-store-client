import { JwtAuthGuard } from '@/common/auth/auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/role.enum';
import { HTTP_RESPONSE } from '@/common/helpers/response.helper';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from './users.service';
import { paginate } from '@/common/helpers/paginate';
import { RolesGuard } from '@/common/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Public } from '@/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('create-account')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createNewAccount(createUserDto);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }
    return HTTP_RESPONSE(result.data, 'Tạo tài khoản thành công', HttpStatus.CREATED);
  }

  @Post('sign-in')
  @Public()
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
    const { role } = req.query;

    const result = await this.usersService.getAllUsers({ page, limit, skip, search, role: role as string });

    return HTTP_RESPONSE(result.data, 'Lấy danh sách người đùng thành công', HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('get-user')
  async getUser(@Query('userId') email: string) {
    const result = await this.usersService.getUser(email);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return HTTP_RESPONSE(result.data, 'Lấy chi tiết người dùng thành công', HttpStatus.OK);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Body() dto: SignInDto) {
    const result = await this.usersService.changePassword(dto);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return HTTP_RESPONSE(result.data, 'Đổi mật khẩu thành công', HttpStatus.ACCEPTED);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-account/:id')
  async updateUser(@Param('id') email: string, @Body() dto: UpdateUserDto) {
    const result = await this.usersService.updateUser(email, dto);

    if (!result.success) {
      throw new BadRequestException(result.error);
    }

    return HTTP_RESPONSE(result.data, 'Đổi mật khẩu thành công', HttpStatus.OK);
  }

  @Get('email')
  @Public()
  testMail() {
    this.mailerService.sendMail({
      to: 'thanhtruckingbear@gmail.com', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>Hello Itmix</b>', // HTML body content
    });

    return 'ok';
  }
}
