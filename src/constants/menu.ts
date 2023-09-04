import React from 'react';

type MenuType = {
  label: string;
  icon: React.ReactNode;
};

export const Menus: MenuType[] = [
  {
    label: 'Menu.Feed',
    icon: 'HomeOutlined',
  },
  {
    label: 'Menu.Friends',
    icon: 'UserOutlined',
  },
  {
    label: 'Menu.Photos',
    icon: 'FileImageOutlined',
  },
  {
    label: 'Menu.Stories',
    icon: 'VideoCameraOutlined',
  },
];
