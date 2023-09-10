import { ReactNode } from 'react';
import Header from '@layouts/components/Header';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import styles from './HeaderLayout.module.scss';

const cx = classNames.bind(styles);

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className={cx('wrapper')}>
      <Layout.Header className={cx('header')}>
        <Header />
      </Layout.Header>
      <Layout hasSider className={cx('body')}>
        <Layout.Content className={cx('content')}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default HeaderLayout;
