import { Divider, Input } from 'antd';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FileImageOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './Posts.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpg';

const cx = classNames.bind(styles);

const Posts = () => {
  const { t } = useTranslation(['Home', 'Common']);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <img src={AvatarDefault} alt="Avatar" className={cx('avatar')} />
        <Input className={cx('input')} placeholder={t('Search.Placeholder')} suffix={<SmileOutlined />} />
        <button className={cx('button')}>{t('Button.Label')}</button>
      </div>
      <Divider style={{ margin: '16px 0' }} />
      <div className={cx('options')}>
        <div className={cx('item')}>
          <FileImageOutlined className={cx('icon')} />
          <span className="text-default">{t('Posts.Image')}</span>
        </div>
        <div className={cx('item')}>
          <PaperClipOutlined className={cx('icon')} />
          <span className="text-default">{t('Posts.Attachment')}</span>
        </div>
      </div>
    </div>
  );
};

export default Posts;
