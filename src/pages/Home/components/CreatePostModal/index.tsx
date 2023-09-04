import { Divider, Input, Modal, Tag } from 'antd';
import classNames from 'classnames/bind';
import { DownOutlined, FileImageOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './CreatePostModal.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

type CreatePostModalProps = {
  isOpenModal: boolean;
  setIsOpenModal: any;
};

const CreatePostModal = ({ isOpenModal, setIsOpenModal }: CreatePostModalProps) => {
  const { t } = useTranslation(['Home', 'Common']);

  return (
    <Modal className={cx('wrapper')} open={isOpenModal} onCancel={() => setIsOpenModal(false)} footer={null}>
      <div className={cx('head')}>
        <img src={AvatarDefault} alt="Avatar" className={cx('avatar')} />
        <div className={cx('name')}>
          <span className={cx('fullname')}>Jakob Botosh</span>
          <span className={cx('privacy')}>
            Public <DownOutlined style={{ fontSize: '10px', fontWeight: 600 }} />
          </span>
        </div>
      </div>
      <div className={cx('content')}>
        <Input.TextArea className={cx('status')} placeholder={t('Search.Placeholder')} />
      </div>
      <div className={cx('options')}>
        <span className="text-default mr-10">Add to your post</span>
        <Tag icon={<FileImageOutlined className={cx('item-icon')} />} color="#f8f8f8">
          <span className={cx('item-text')}>{t('Posts.Image')}</span>
        </Tag>
        <Tag icon={<PaperClipOutlined className={cx('item-icon')} />} color="#f8f8f8">
          <span className={cx('item-text')}>{t('Posts.Attachment')}</span>
        </Tag>
      </div>
      <Divider style={{ margin: '16px 0' }} />
      <div>
        <button className={cx('button')} onClick={() => setIsOpenModal(true)}>
          {t('Button.Label')}
        </button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
