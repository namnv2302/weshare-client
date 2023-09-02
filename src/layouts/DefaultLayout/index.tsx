import { Layout } from 'antd';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '@layouts/components/Header';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout className={cx('wrapper')}>
      <Layout.Header className={cx('header')}>
        <Header />
      </Layout.Header>
      <Layout hasSider>
        <Layout.Sider className={cx('sider-left')}>Sider</Layout.Sider>
        <Layout.Content className={cx('content')}>{children}</Layout.Content>
        <Layout.Sider className={cx('sider-right')}>Sider</Layout.Sider>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
