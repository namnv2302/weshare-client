import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { PlusOutlined } from '@ant-design/icons';
import styles from './CreateStories.module.scss';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const CreateStories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={cx('story-item', 'add-story')}>
      <div className={cx('body')} style={{ backgroundColor: '#343a40' }}>
        <div className={cx('info')} onClick={() => navigate(ROUTE_PATH.STORIES)}>
          <div className={cx('icon')}>
            <PlusOutlined className={cx('plus-icon')} />
          </div>
          <h4 className={cx('add')}>{t('Home:Story.Create')}</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateStories;
