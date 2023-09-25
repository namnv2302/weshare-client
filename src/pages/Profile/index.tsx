import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Col, Row, Spin, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FileImageOutlined, UserOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import styles from './Profile.module.scss';
import LeftPanel from '@pages/Profile/components/LeftPanel';
import RightPanel from '@pages/Profile/components/RightPanel';
import CoverProfile from '@assets/images/cover-profile.png';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { upload } from '@helpers/upload';
import { updateAvatar } from '@apis/user';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const authorization = useAppSelector((state) => state.authorization);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUploadImage = useCallback(
    async (file: any) => {
      setUploading(true);
      try {
        const avatarUrl = await upload(file);
        if (authorization && avatarUrl) {
          await updateAvatar(authorization?.id, avatarUrl);
        }
        setUploading(false);
        message.success('Change avatar success!');
      } catch (error) {
        setUploading(false);
        message.error('Change avatar failed!');
      }
    },
    [authorization],
  );

  const renderResult = useCallback((attrs: any) => {
    return (
      <div className={cx('option')} tabIndex="-1" {...attrs}>
        <Button icon={<UserOutlined />} className={cx('button')}>
          See profile picture
        </Button>
        <ImgCrop rotationSlider>
          <Upload accept="image/jpg, image/jpeg, image/png" beforeUpload={handleUploadImage}>
            <Button icon={<FileImageOutlined />} className={cx('button')}>
              Choose profile picture
            </Button>
          </Upload>
        </ImgCrop>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {uploading ? (
        <Spin />
      ) : (
        <div className={cx('wrapper')}>
          <div className={cx('cover-profile')} style={{ backgroundImage: `url(${CoverProfile})` }}>
            <div>
              <Tippy delay={[0, 500]} interactive placement="bottom" hideOnClick={false} render={renderResult}>
                <img className={cx('avatar')} src={authorization?.avatar || AvatarDefault} alt="" />
              </Tippy>
            </div>
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
      )}
    </>
  );
};

export default ProfilePage;
