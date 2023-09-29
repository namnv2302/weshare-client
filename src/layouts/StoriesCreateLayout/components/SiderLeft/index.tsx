import { useTranslation } from 'react-i18next';
import { CirclePicker } from 'react-color';
import { Button, Divider, Input, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import classNames from 'classnames/bind';
import styles from './SiderLeft.module.scss';
import { StoriesOption } from '@slices/storiesSlice';
import { setBgColor, changeText } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const SiderLeft = () => {
  const { t } = useTranslation(['Stories']);
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const { currentStoriesOption } = useAppSelector((state) => state.stories);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={5}>{t('Label')}</Typography.Title>
      <div className={cx('head')}>
        <img src={authorization?.avatar} alt={authorization?.name} />
        <Typography.Text className={cx('name')}>{authorization?.name || 'Jakob Botosh'}</Typography.Text>
      </div>
      <Divider style={{ margin: '20px 0' }} />
      {currentStoriesOption === StoriesOption.TEXT ? (
        <>
          <Input.TextArea
            className={cx('text-input')}
            placeholder={t('Input.Placeholder')}
            onChange={(e) => dispatch(changeText(e.target.value))}
          />
          <div className={cx('circle-choose')}>
            <CirclePicker onChange={(color) => dispatch(setBgColor(color.hex))} />
          </div>
          <div className={cx('button')}>
            <Button className={cx('btn-default', 'discard')}>{t('Button.Discard')}</Button>
            <Button className={cx('btn-default', 'share')}>{t('Button.Share')}</Button>
          </div>
        </>
      ) : (
        false
      )}
    </div>
  );
};

export default SiderLeft;
