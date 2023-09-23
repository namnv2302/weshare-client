import classNames from 'classnames/bind';
import { Col, Image, Row } from 'antd';
import styles from './Profile.module.scss';
import LeftPanel from '@pages/Profile/components/LeftPanel';
import RightPanel from '@pages/Profile/components/RightPanel';
import CoverProfile from '@assets/images/cover-profile.png';
import AvatarDefault from '@assets/images/avatar_default.jpeg';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('cover-profile')} style={{ backgroundImage: `url(${CoverProfile})` }}>
        <Image className={cx('avatar')} src={AvatarDefault} preview={false} />
      </div>
      <Row gutter={{ lg: 32 }}>
        <Col lg={{ span: 9 }}>
          <LeftPanel />
        </Col>
        <Col lg={{ span: 15 }}>
          <RightPanel />
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
