import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import classNames from 'classnames/bind';
import { Col, Image, Row } from 'antd';
import styles from './User.module.scss';
import LeftPanel from '@pages/User/components/LeftPanel';
import RightPanel from '@pages/User/components/RightPanel';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import CoverProfile from '@assets/images/cover-profile.png';
import useUserBySlug from '@hooks/users/useUserBySlug';

const cx = classNames.bind(styles);

const UserPage = () => {
  const { slug } = useParams();
  const userSlug = useMemo(() => slug, [slug]) as string;
  const { data, loading } = useUserBySlug(userSlug);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('cover-profile')} style={{ backgroundImage: `url(${CoverProfile})` }}>
        <Image className={cx('avatar')} src={data?.avatar || AvatarDefault} />
      </div>
      <Row gutter={{ lg: 32 }}>
        <Col lg={{ span: 9 }}>
          <LeftPanel data={data} loading={loading} />
        </Col>
        <Col lg={{ span: 15 }}>
          <RightPanel data={data} loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;
