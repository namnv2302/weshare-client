import React from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const MenuItem = ({ label, isActive, icon }: { label: string; isActive?: boolean; icon: React.ReactNode }) => {
  return (
    <div className={cx('menu-item', { active: isActive })}>
      {icon}
      <span className={cx('menu-label')}>{label}</span>
    </div>
  );
};

export default MenuItem;
