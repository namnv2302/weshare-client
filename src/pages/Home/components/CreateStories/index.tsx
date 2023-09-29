import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { PlusOutlined } from '@ant-design/icons';
import styles from './CreateStories.module.scss';
import AvatarDefault from '@assets/images/avatar_default.jpeg';
import { useAppSelector } from 'redux/hooks';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const CreateStories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar')} onClick={() => navigate(ROUTE_PATH.STORIES)}>
        <img src={authorization?.avatar || AvatarDefault} alt="" />
        <PlusOutlined className={cx('plus-icon')} />
      </div>
      <span className={cx('label')}>{t('Home:Story.Create')}</span>
    </div>
  );
};

export default CreateStories;
