import { useCallback, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Button, Col, Image, Row, Spin, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CameraOutlined, FileImageOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import styles from './Profile.module.scss';
import LeftPanel from '@pages/Profile/components/LeftPanel';
import RightPanel from '@pages/Profile/components/RightPanel';
import CoverProfile from '@assets/images/cover-profile.png';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { uploadImage } from '@apis/upload';
import { updateAvatar, updateCoverPhoto } from '@apis/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { changeAvatar, changeCoverPhoto } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const ProfilePage = () => {
  const { t } = useTranslation(['Profile']);
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const imageRef = useRef<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [visibleOption, setVisibleOption] = useState<boolean>(false);

  const handleUploadAvatar = useCallback(
    async (file: any) => {
      setUploading(true);
      try {
        const resp = await uploadImage(file, 'profiles');
        if (resp.status === 201) {
          if (authorization) {
            await updateAvatar(authorization?.id, resp.data.data.secure_url);
            dispatch(changeAvatar({ avatar: resp.data.data.secure_url }));
          }
          message.success(t('Avatar.Success'));
        } else {
          message.error(t('Avatar.Failed'));
        }
        setUploading(false);
      } catch (error) {
        setUploading(false);
        message.error(t('Avatar.Failed'));
      }
    },
    [authorization, dispatch, t],
  );

  const handleUpdateCoverPhoto = useCallback(
    async (file: any) => {
      setUploading(true);
      try {
        const resp = await uploadImage(file, 'profiles');
        if (resp.status === 201) {
          if (authorization) {
            await updateCoverPhoto(authorization.id, resp.data.data.secure_url);
            dispatch(changeCoverPhoto(resp.data.data.secure_url));
          }
          message.success(t('CoverPhoto.Success'));
        } else {
          message.error(t('CoverPhoto.Failed'));
        }
        setUploading(false);
      } catch (error) {
        setUploading(false);
        message.error(t('CoverPhoto.Failed'));
      }
    },
    [authorization, dispatch, t],
  );

  const handleSeeProfilePicture = useCallback(() => {
    imageRef.current.querySelector('.ws-image').click();
    setVisibleOption(false);
  }, []);

  const renderResult = useCallback((attrs: any) => {
    return (
      <div className={cx('option')} tabIndex="-1" {...attrs}>
        <Button icon={<UserOutlined />} className={cx('button')} onClick={handleSeeProfilePicture}>
          {t('Avatar.Option1')}
        </Button>
        <ImgCrop rotationSlider>
          <Upload accept="image/jpg, image/jpeg, image/png" beforeUpload={handleUploadAvatar}>
            <Button icon={<FileImageOutlined />} className={cx('button')} onClick={() => setVisibleOption(false)}>
              {t('Avatar.Option2')}
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
        <Spin
          style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
          size="large"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      ) : (
        <div className={cx('wrapper')}>
          <div
            className={cx('cover-profile')}
            style={{ backgroundImage: `url(${authorization?.cover || CoverProfile})` }}
          >
            <ImgCrop rotationSlider quality={1} aspect={2.6}>
              <Upload accept="image/jpg, image/jpeg, image/png" beforeUpload={handleUpdateCoverPhoto}>
                <CameraOutlined className={cx('camera-icon')} />
              </Upload>
            </ImgCrop>
            <div>
              <Tippy
                visible={visibleOption}
                delay={[0, 500]}
                interactive
                placement="bottom"
                // hideOnClick={false}
                onClickOutside={() => setVisibleOption(false)}
                render={renderResult}
              >
                <img
                  className={cx('avatar')}
                  src={authorization?.avatar || AvatarDefault}
                  alt=""
                  onClick={() => setVisibleOption(!visibleOption)}
                />
              </Tippy>
            </div>
          </div>
          <span ref={imageRef} style={{ display: 'none' }}>
            <Image width={200} src={authorization?.avatar || AvatarDefault} />
          </span>
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
