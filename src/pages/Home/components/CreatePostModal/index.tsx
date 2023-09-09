import { useCallback, useEffect, useState } from 'react';
import { Button, Divider, Input, Modal, Tag, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import { CloseOutlined, DownOutlined, FileImageOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';
import styles from './CreatePostModal.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';
import { createPost } from '@apis/post';
import { upload } from '@helpers/upload';
import { useAppDispatch } from 'redux/hooks';
import { createPost as createPostAction } from '@slices/postSlice';

const cx = classNames.bind(styles);

type CreatePostModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: any;
};

const CreatePostModal = ({ isOpenModal, setIsOpenModal }: CreatePostModalProps) => {
  const { t } = useTranslation(['Home', 'Common']);
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const [creating, setCreating] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [previewPostUrl, setPreviewPostUrl] = useState<any>();

  useEffect(() => {
    return () => {
      return previewPostUrl && URL.revokeObjectURL(previewPostUrl.preview);
    };
  }, [previewPostUrl]);

  const handleUploadImage = useCallback((file: any) => {
    file.preview = URL.createObjectURL(file);
    setPreviewPostUrl(file);
  }, []);

  const clearField = useCallback(() => {
    setStatus('');
    setPreviewPostUrl(undefined);
  }, []);

  const handleCreatePost = useCallback(async () => {
    setCreating(true);
    try {
      if (previewPostUrl === undefined && !status.trim()) {
        message.info(t('Post.Require'));
        setCreating(false);
      } else if (previewPostUrl === undefined && status.trim()) {
        await createPost({ status, postUrl: '' });
        setTimeout(() => {
          setIsOpenModal(false);
          dispatch(createPostAction({ status, postUrl: '', user: authorization }));
          clearField();
          message.success(t('Post.Success'));
          setCreating(false);
        }, 2000);
      } else {
        const postUrl = await upload(previewPostUrl);
        await createPost({ status, postUrl });
        dispatch(createPostAction({ status, postUrl, user: authorization }));
        setIsOpenModal(false);
        clearField();
        message.success(t('Post.Success'));
        setCreating(false);
      }
    } catch (error) {
      clearField();
      setCreating(false);
    }
  }, [previewPostUrl, t, status, setIsOpenModal, clearField, dispatch, authorization]);

  const handleRemovePreviewPostUrl = useCallback(() => {
    if (previewPostUrl) {
      URL.revokeObjectURL(previewPostUrl.preview);
      setPreviewPostUrl(undefined);
    }
  }, [previewPostUrl]);

  return (
    <Modal className={cx('wrapper')} open={isOpenModal} onCancel={() => setIsOpenModal(false)} footer={null}>
      <div className={cx('head')}>
        <img src={AvatarDefault} alt="Avatar" className={cx('avatar')} />
        <div className={cx('name')}>
          <span className={cx('fullname')}>{authorization ? authorization.name : 'Jakob Botosh'}</span>
          <span className={cx('privacy')}>
            Public <DownOutlined style={{ fontSize: '10px', fontWeight: 600 }} />
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        <Input.TextArea
          value={status}
          className={cx('status')}
          placeholder={t('Search.Placeholder')}
          onChange={(e: any) => setStatus(e.target.value)}
        />
      </div>
      {previewPostUrl ? (
        <div className={cx('preview-post')}>
          <div className={cx('image')}>
            <img src={previewPostUrl && previewPostUrl.preview} alt="Post" />
            <CloseOutlined className={cx('icon')} onClick={handleRemovePreviewPostUrl} />
          </div>
        </div>
      ) : (
        false
      )}
      <div className={cx('options')}>
        <span className="text-default mr-10">{t('Posts.Label')}</span>
        <label id="post-img" style={{ display: 'inline-block', cursor: 'pointer' }}>
          <Tag
            icon={<FileImageOutlined className={cx('item-icon')} />}
            color="#f8f8f8"
            style={{ position: 'relative' }}
          >
            <span className={cx('item-text')}>{t('Posts.Image')}</span>
          </Tag>
          <ImgCrop rotationSlider>
            <Upload
              id="post-img"
              style={{
                position: 'absolute',
                opacity: 0,
                cursor: 'pointer',
                zIndex: -1,
              }}
              accept="image/jpg, image/jpeg, image/png"
              beforeUpload={handleUploadImage}
            />
          </ImgCrop>
        </label>
        <Tag icon={<PaperClipOutlined className={cx('item-icon')} />} color="#f8f8f8" style={{ cursor: 'pointer' }}>
          <span className={cx('item-text')}>{t('Posts.Attachment')}</span>
        </Tag>
      </div>
      <Divider style={{ margin: '16px 0' }} />
      <div>
        <Button loading={creating} className={cx('button')} onClick={handleCreatePost}>
          {t('Button.Label')}
        </Button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
