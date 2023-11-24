import { useCallback, useEffect, useState } from 'react';
import { Button, Divider, Modal, Tag, Upload, message, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import { CloseOutlined, DownOutlined, FileImageOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppSelector } from 'redux/hooks';
import styles from './CreatePostModal.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { createPost } from '@apis/post';
import { uploadImage } from '@apis/upload';
import { useAppDispatch } from 'redux/hooks';
import { fetchPostList } from '@slices/postSlice';

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
          dispatch(fetchPostList());
          message.success(t('Post.Success'));
          setCreating(false);
          clearField();
        }, 2000);
      } else {
        const resp = await uploadImage(previewPostUrl, 'posts');
        if (resp.status === 201 && resp.data) {
          const newPost = await createPost({ status, postUrl: resp.data.data.secure_url });
          if (newPost.status === 201) {
            dispatch(fetchPostList());
            message.success(t('Post.Success'));
          } else {
            message.error(t('Post.Failure'));
          }
        } else {
          message.error(t('Post.Failure'));
        }
        setIsOpenModal(false);
        setCreating(false);
        clearField();
      }
    } catch (error) {
      clearField();
      setCreating(false);
    }
  }, [previewPostUrl, t, status, setIsOpenModal, clearField, dispatch]);

  const handleRemovePreviewPostUrl = useCallback(() => {
    if (previewPostUrl) {
      URL.revokeObjectURL(previewPostUrl.preview);
      setPreviewPostUrl(undefined);
    }
  }, [previewPostUrl]);

  return (
    <Modal className={cx('wrapper')} open={isOpenModal} onCancel={() => setIsOpenModal(false)} footer={null}>
      <div className={cx('head')}>
        <img src={authorization?.avatar || AvatarDefault} alt="Avatar" className={cx('avatar')} />
        <div className={cx('name')}>
          <span className={cx('fullname')}>{authorization ? authorization.name : 'Jakob Botosh'}</span>
          <span className={cx('privacy')}>
            Public <DownOutlined style={{ fontSize: '10px', fontWeight: 600 }} />
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        <CKEditor
          editor={ClassicEditor}
          data={status}
          onChange={(event, editor) => {
            const data = editor.getData();
            setStatus(data);
          }}
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
        <Tag
          icon={<PaperClipOutlined className={cx('item-icon')} />}
          color="#f8f8f8"
          style={{ cursor: 'pointer' }}
          onClick={() => notification.info({ message: t('Common:NotYet'), placement: 'top' })}
        >
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
