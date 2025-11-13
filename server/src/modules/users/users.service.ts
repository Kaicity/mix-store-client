import { generateVerifyCode, hashPasswordHelper } from '@/common/helpers/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, type UserDocument } from './schemas/user.schema';
import * as dayjs from 'dayjs';
import { AuthService } from '@/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private configService: ConfigService,
  ) {}

  private async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async create(dto: CreateUserDto) {
    const isExist = await this.isEmailExist(dto.email);
    if (isExist) throw new BadRequestException(`Email đã tồn tại, vui lòng sử dụng email khác`);

    const hashPassword = await hashPasswordHelper(dto.password);

    const codeId = generateVerifyCode();

    const newUser = await this.userModel.create({
      ...dto,
      password: hashPassword,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minute').toDate(),
      isActive: false,
    });

    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Kích hoạt tài khoản của bạn',
      template: 'register',
      context: {
        name: newUser.name ?? newUser.email,
        activationCode: codeId,
        client_domain: this.configService.get<string>('CLIENT_PORT'),
      },
    });

    return {
      message: 'Tạo tài khoản thành công',
      data: { email: newUser.email, name: newUser.name },
    };
  }

  async resendCode(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException('Email không tồn tại');

    const codeId = generateVerifyCode();

    user.codeId = codeId;
    user.codeExpired = dayjs().add(5, 'minute').toDate();
    await user.save();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Kích hoạt tài khoản của bạn',
      template: 'register',
      context: {
        name: user.name ?? user.email,
        activationCode: codeId,
        client_domain: this.configService.get<string>('CLIENT_PORT'),
      },
    });

    return {
      message: 'Mã code đã được gửi đến email',
    };
  }

  async getAll({ page, limit, skip, search, role, status }: any) {
    const query: any = {};
    if (search) query.$or = [{ email: { $regex: search, $options: 'i' } }];
    if (role) query.role = role;
    if (status) query.status = status;

    const [total, users] = await Promise.all([
      this.userModel.countDocuments(query),
      this.userModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    ]);

    return {
      message: 'Lấy danh sách người dùng thành công',
      data: {
        users: users.map((u) => ({
          name: u.name,
          email: u.email,
          role: u.role,
          phone: u.phone,
          address: u.address,
          image: u.image,
          isActive: u.isActive,
        })),
        pagination: {
          totalItems: total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          limit,
        },
      },
    };
  }

  async getByEmail(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Không tìm thấy người dùng này');

    return {
      message: 'Lấy chi tiết người dùng thành công',
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        image: user.image,
        isActive: user.isActive,
      },
    };
  }

  async update(_id: string, dto: UpdateUserDto) {
    const updateData: any = { ...dto, updatedAt: new Date() };

    if (dto.password) {
      updateData.password = await hashPasswordHelper(dto.password);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    return {
      message: 'Cập nhật người dùng thành công',
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        image: updatedUser.image,
      },
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async removeById(_id: string) {
    const result = await this.userModel.deleteOne({ _id });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Không tìm thấy người dùng nào');
    }
    return { message: 'Xóa người dùng thành công' };
  }
}
