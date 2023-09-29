import { useState } from 'react';
import { Divider, Input } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FileImageOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './Posts.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import CreatePostModal from '@pages/Home/components/CreatePostModal';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const Posts = () => {
  const { t } = useTranslation(['Home', 'Common']);
  const authorization = useAppSelector((state) => state.authorization);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <img src={authorization?.avatar || AvatarDefault} alt="Avatar" className={cx('avatar')} />
        <Input
          className={cx('input')}
          placeholder={t('Search.Placeholder')}
          suffix={<SmileOutlined />}
          onClick={() => setIsOpenModal(true)}
        />
        <button className={cx('button')} onClick={() => setIsOpenModal(true)}>
          {t('Button.Label')}
        </button>
      </div>
      <Divider style={{ margin: '16px 0' }} />
      <div className={cx('options')}>
        <div className={cx('item')} onClick={() => setIsOpenModal(true)}>
          <FileImageOutlined className={cx('icon')} />
          <span className="text-default">{t('Posts.Image')}</span>
        </div>
        <div className={cx('item')} onClick={() => setIsOpenModal(true)}>
          <PaperClipOutlined className={cx('icon')} />
          <span className="text-default">{t('Posts.Attachment')}</span>
        </div>
      </div>
      <CreatePostModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
};

export default Posts;
