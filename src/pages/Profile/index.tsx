import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import styles from './Profile.module.scss';
import LeftPanel from '@pages/Profile/components/LeftPanel';
import RightPanel from '@pages/Profile/components/RightPanel';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <div className={cx('wrapper')}>
      <Row>
        <Col lg={{ span: 8 }}>
          <LeftPanel />
        </Col>
        <Col lg={{ span: 16 }}>
          <RightPanel />
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
