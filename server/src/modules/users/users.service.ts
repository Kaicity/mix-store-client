import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import type { Model } from 'mongoose';
import { hashPasswordHelper } from '@/helpers/utils';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { successResponse } from '@/constant/response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.findOne({ email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    //check mail
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email: ${email} đã tồn tại, vui lòng sử dụng email khác`,
      );
    }

    //hash password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });

    return successResponse('Tạo tài khoản thành công', {}, HttpStatus.CREATED);
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * pageSize;

    const result = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return successResponse(
      'Lấy danh sách người dùng thành công',
      {
        users: result,
        pagination: {
          current,
          pageSize,
          totalItems,
          totalPages,
        },
      },
      HttpStatus.OK,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto) {
    if (!mongoose.isValidObjectId(updateUserDto._id)) {
      throw new BadRequestException('Id không đúng định dạng mongodb');
    }

    const existingUser = await this.userModel.findById(updateUserDto._id);
    if (!existingUser) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const result = await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );

    return successResponse(
      'Cập nhật thành công',
      {
        updateId: updateUserDto._id,
      },
      HttpStatus.OK,
    );
  }

  async remove(_id: string) {
    //check id là 1 object
    if (mongoose.isValidObjectId(_id)) {
      const result = await this.userModel.deleteOne({ _id });

      if (result.deletedCount === 0) {
        throw new NotFoundException('Không tìm thấy người dùng để xóa');
      }
    } else {
      throw new BadRequestException('Id không đúng định dạng mongodb');
    }

    return successResponse('Xóa thành công', { deleteId: _id }, HttpStatus.OK);
  }
}
