import { hashPasswordHelper } from '@/common/helpers/utils';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, type UserDocument } from './schemas/user.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
  ) {}

  private async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  async create(dto: CreateUserDto) {
    const isExist = await this.isEmailExist(dto.email);
    if (isExist) throw new BadRequestException(`Email ${dto.email} đã tồn tại, vui lòng sử dụng email khác`);

    const hashPassword = await hashPasswordHelper(dto.password);
    const codeId = uuidv4();

    const newUser = await this.userModel.create({
      ...dto,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(30, 'seconds'),
    });

    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Kích hoạt tài khoản của bạn tại @eMixShop',
      template: 'register',
      context: { name: newUser.name ?? newUser.email, activationCode: codeId },
    });

    return {
      message: 'Tạo tài khoản thành công',
      data: { email: newUser.email, name: newUser.name },
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

  async update(email: string, dto: UpdateUserDto) {
    const existedUser = await this.userModel.findOne({ email });
    if (!existedUser) throw new NotFoundException(`Không tìm thấy người dùng có email: ${email}`);

    const updateData: any = { ...dto, updatedAt: new Date() };
    if (dto.password) {
      updateData.password = await hashPasswordHelper(dto.password);
    }

    const user = await this.userModel.findByIdAndUpdate(existedUser._id, updateData, {
      new: true,
    });

    return {
      message: 'Cập nhật người dùng thành công',
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
