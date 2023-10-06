import { ReactNode } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames/bind';
import styles from './StoriesLayout.module.scss';
import Header from '@layouts/components/Header';
import SiderLeft from '@layouts/StoriesLayout/components/SiderLeft';

const cx = classNames.bind(styles);

const StoriesLayout = ({ children }: { children: ReactNode }) => {
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
      </Layout>
    </Layout>
  );
};

export default StoriesLayout;
