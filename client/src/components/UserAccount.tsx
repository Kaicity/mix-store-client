import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Divider } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface UserAccountProps {
  handleLogout: () => void;
}

const UserAccount = ({ handleLogout }: UserAccountProps) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            src: 'user-avt.webp',
          }}
          name={<ChevronDown className="w-4 h-4" />}
          className="transition-transform"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <User
            avatarProps={{
              src: 'user-avt.webp',
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
        <DropdownItem onClick={handleLogout} key="logout" color="danger">
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAccount;
