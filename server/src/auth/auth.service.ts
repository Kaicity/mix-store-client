import { comparePasswordHelper, generateVerifyCode, hashPasswordHelper } from '@/common/helpers/utils';
import { UsersService } from '@/modules/users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    let isMatchPassword = false;
    if (user) {
      isMatchPassword = await comparePasswordHelper(password, user.password);
    }

    if (!user || !isMatchPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Email không tồn tại');

    const codeId = generateVerifyCode();
    const codeExpired = dayjs().add(5, 'minute').toDate(); // hết hạn sau 5 phút

    user.codeId = codeId;
    user.codeExpired = codeExpired;
    await user.save();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Xác nhận quên mật khẩu',
      template: 'reset_password',
      context: { name: user.name ?? user.email, activationCode: codeId },
    });

    return {
      message: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu',
    };
  }

  async verifyResetPassword(email: string, codeId: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.codeId !== codeId) throw new BadRequestException('Mã không hợp lệ');
    if (dayjs().isAfter(user.codeExpired)) throw new BadRequestException('Mã đã hết hạn');
    return user;
  }

  async verifyAccount(email: string, codeId: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.codeId !== codeId) throw new BadRequestException('Mã không hợp lệ');
    if (dayjs().isAfter(user.codeExpired)) throw new BadRequestException('Mã đã hết hạn');

    if (!user.isActive) {
      user.isActive = true;
      user.codeId = null;
      user.codeExpired = null;
      await user.save();
    }

    return { message: 'Kích hoạt tài khoản thành công' };
  }

  async resetPassword(email: string, codeId: string, newPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.codeId !== codeId) throw new BadRequestException('Mã không hợp lệ');

    if (dayjs().isAfter(user.codeExpired)) throw new BadRequestException('Mã đã hết hạn');

    user.password = await hashPasswordHelper(newPassword);
    user.codeId = null;
    user.codeExpired = null;
    await user.save();

    return { message: 'Đặt lại mật khẩu thành công' };
  }
}
