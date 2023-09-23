import classNames from 'classnames/bind';
import styles from './CreateStories.module.scss';
import Avatar from '@assets/images/avatar_default.jpeg';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const CreateStories = () => {
  const { t } = useTranslation();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar')}>
        <img src={Avatar} alt="Avatar" />
      </div>
      <span className={cx('label')}>{t('Home:YourStory')}</span>
    </div>
  );
};

export default CreateStories;
