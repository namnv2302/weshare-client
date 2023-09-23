import classNames from 'classnames/bind';
import { Col, Image, Row } from 'antd';
import styles from './User.module.scss';
import LeftPanel from '@pages/User/components/LeftPanel';
import RightPanel from '@pages/User/components/RightPanel';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import CoverProfile from '@assets/images/cover-profile.png';

const cx = classNames.bind(styles);

const UserPage = () => {
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

export default UserPage;
