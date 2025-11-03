import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateRandomCode, hashPasswordHelper } from '@/common/helpers/utils';
import { User, type UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from '@/common/constant/response';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  private async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async createNewAccount(dto: CreateUserDto) {
    // check mail exist
    const isExist = await this.isEmailExist(dto.email);
    if (isExist) return RESPONSE_ERROR(`Email: ${dto.email} đã tồn tại, vui lòng sử dụng email khác`);

    // hash password
    const hashPassword = await hashPasswordHelper(dto.password);

    const userId = generateRandomCode();

    const newUser = await this.userModel.create({
      ...dto, // Spread - khong lay password , spread lay het cac thuoc tinh con lai
      userId,
      password: hashPassword,
    });

    return RESPONSE_SUCCESS({ email: newUser.email, name: newUser.name });
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });

    if (!user) return RESPONSE_ERROR(`Tài khoản người dùng không tồn tại`);

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) return RESPONSE_ERROR(`Tài khoản hoặc mật khẩu không đúng`);

    const payload = { sub: user.id, username: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return RESPONSE_SUCCESS({
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
      access_token,
    });
  }

  async getAllUsers({
    page,
    limit,
    skip,
    search,
    role,
    status,
  }: {
    page: number;
    limit: number;
    skip: number;
    search?: string;
    role?: string;
    status?: string;
  }) {
    const query: any = {};

    if (search) query.$or = [{ email: { $regex: search, $options: 'i' } }];
    if (role) query.role = role;
    if (status) query.status = status;

    const [total, users] = await Promise.all([
      this.userModel.countDocuments(query),
      this.userModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    ]);

    return RESPONSE_SUCCESS({
      data: users.map((item) => ({
        name: item.name,
        email: item.email,
        role: item.role,
        phone: item.phone,
        address: item.address,
        image: item.image,
        isActive: item.isActive,
      })),
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  }

  async getUser(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return RESPONSE_ERROR('Không tìm thấy người dùng này');

    return RESPONSE_SUCCESS({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        image: user.image,
        isActive: user.isActive,
      },
    });
  }

  async changePassword(dto: SignInDto) {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ email });
    if (!user) return RESPONSE_ERROR('Không tìm thấy người dùng này');

    // hash password
    const hashPassword = await hashPasswordHelper(password);

    await this.userModel.findByIdAndUpdate(user._id, { password: hashPassword });

    return RESPONSE_SUCCESS({});
  }

  async updateUser(email: string, dto: UpdateUserDto) {
    const existedUser = await this.userModel.findOne({ email });
    if (!existedUser) return RESPONSE_ERROR(`Không tìm thấy người dùng có email: ${email}`);

    // hash password
    const hashPassword = await hashPasswordHelper(dto.password);

    const user = await this.userModel.findByIdAndUpdate(
      existedUser._id.toString(),
      { ...dto, password: hashPassword, updatedAt: new Date() },
      { new: true },
    );

    return RESPONSE_SUCCESS({
      name: user.name,
      image: user.image,
      role: user.role,
    });
  }
}
