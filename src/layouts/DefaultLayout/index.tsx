import { Layout } from 'antd';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '@layouts/components/Header';
import SiderLeft from '@layouts/components/SiderLeft';
import SiderRight from '@layouts/components/SiderRight';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className={cx('wrapper')}>
      <Layout.Header className={cx('header')}>
        <Header />
      </Layout.Header>
      <Layout hasSider className={cx('body')}>
        <Layout.Sider className={cx('sider-left')}>
          <SiderLeft />
        </Layout.Sider>
        <Layout.Content className={cx('content')}>{children}</Layout.Content>
        <Layout.Sider className={cx('sider-right')}>
          <SiderRight />
        </Layout.Sider>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
