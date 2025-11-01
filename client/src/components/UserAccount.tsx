import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Divider } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const UserAccount = () => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            src: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/558040306_2170095696730194_605370771732626348_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=YlH2UifbSAQQ7kNvwEBXd0e&_nc_oc=AdnDGZWiaB4AuI-ps_ESmvhcNyeWl-9XbJOO3T8XoR7UYaTn_ea9y-vIukN2SVM4hzM&_nc_zt=24&_nc_ht=scontent.fsgn1-1.fna&_nc_gid=0Oal5oXUpaaFfd9YPYn1jg&oh=00_AfeD1uhLHCMRGxgceEIst0-2g3MV9pYc0N247nYfe15oZg&oe=690BB336',
          }}
          name={<ChevronDown className="w-4 h-4" />}
          className="transition-transform"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <User
            avatarProps={{
              src: 'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-1/558040306_2170095696730194_605370771732626348_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=YlH2UifbSAQQ7kNvwEBXd0e&_nc_oc=AdnDGZWiaB4AuI-ps_ESmvhcNyeWl-9XbJOO3T8XoR7UYaTn_ea9y-vIukN2SVM4hzM&_nc_zt=24&_nc_ht=scontent.fsgn1-1.fna&_nc_gid=0Oal5oXUpaaFfd9YPYn1jg&oh=00_AfeD1uhLHCMRGxgceEIst0-2g3MV9pYc0N247nYfe15oZg&oe=690BB336',
            }}
            description="Thành viên"
            name="Nguyễn Minh Thông"
          />
        </DropdownItem>
        <DropdownItem key="devider">
          <Divider />
        </DropdownItem>
        <DropdownItem key="settings">Hồ sơ</DropdownItem>
        <DropdownItem key="team_settings">Cài đặt</DropdownItem>
        <DropdownItem key="analytics">Feedback với chúng tôi</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAccount;
