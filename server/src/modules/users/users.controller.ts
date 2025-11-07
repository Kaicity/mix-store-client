import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/role.enum';
import { paginate } from '@/common/helpers/paginate';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { Body, Controller, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('Bearer')
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-account')
  @ApiBody({ type: CreateUserDto, description: 'Create - user' })
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('get-users')
  @ApiOperation({ summary: 'Get all users with optional filters' })
  @ApiQuery({ name: 'page', description: 'Page of', required: false, type: Number, example: 1 })
  @ApiQuery({
    name: 'limit',
    description: 'Maximum number of items to return',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({ name: 'search', description: 'Search keyword by name', required: false, type: String })
  @ApiQuery({ name: 'role', description: 'Filter by role', required: false, type: String })
  @ApiQuery({ name: 'isActive', description: 'Filter by isActive', required: false, type: String })
  async getAll(@Req() req: Request) {
    const { page, limit, skip, search } = paginate(req);
    const { role } = req.query;
    return this.usersService.getAll({
      page,
      limit,
      skip,
      search,
      role: role as string,
    });
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('get-user')
  async getUser(@Query('userId') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Put('update-account/:id')
  async updateUser(@Param('id') email: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(email, dto);
  }
}
