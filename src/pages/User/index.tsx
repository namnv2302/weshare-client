import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import styles from './User.module.scss';
import LeftPanel from '@pages/User/components/LeftPanel';
import RightPanel from '@pages/User/components/RightPanel';

const cx = classNames.bind(styles);

const UserPage = () => {
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

export default UserPage;
