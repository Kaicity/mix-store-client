import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto, description: 'Enter mail send vertify code' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Public()
  @Post('verify-reset-password')
  @ApiBody({ type: VerifyCodeDto, description: 'Verify your code' })
  verifyResetPassword(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyResetPassword(dto.email, dto.codeId);
  }

  @Public()
  @Post('verify-account')
  @ApiBody({ type: VerifyCodeDto, description: 'Verify your code' })
  verifyAccount(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyAccount(dto.email, dto.codeId);
  }

  @Public()
  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto, description: 'New password' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.email, dto.codeId, dto.newPassword);
  }
}
