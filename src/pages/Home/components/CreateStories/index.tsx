import classNames from 'classnames/bind';
import styles from './CreateStories.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';

const cx = classNames.bind(styles);

const CreateStories = () => {
  const { t } = useTranslation();
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar')}>
        <img src={authorization?.avatar || AvatarDefault} alt="Avatar" />
      </div>
      <span className={cx('label')}>{t('Home:YourStory')}</span>
    </div>
  );
};

export default CreateStories;
