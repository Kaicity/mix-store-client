import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
