import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/enums/role.enum';
import { paginate } from '@/common/helpers/paginate';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('Bearer')
@UseInterceptors(ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Post('create-user')
  @ApiBody({ type: CreateUserDto, description: 'Create new user' })
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Roles(UserRole.ADMIN)
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
    return await this.usersService.getByEmail(email);
  }

  @Put('update-account/:id')
  async updateUser(@Param('id') email: string, @Body() dto: UpdateUserDto) {
    return await this.usersService.update(email, dto);
  }

  @Delete('delete-user/:id')
  @ApiParam({ name: 'id', example: '690cf549a158b2e7375aab11' })
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeById(id);
  }
}
