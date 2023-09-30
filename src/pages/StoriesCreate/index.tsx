import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames/bind';
import styles from './StoriesCreate.module.scss';
import ImagePhoto from '@assets/images/image.png';
import FontPhoto from '@assets/images/font.png';
import PreviewPanel from '@pages/StoriesCreate/components/PreviewPanel';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { StoriesOption, setStoriesOption, setPreviewStory } from '@slices/storiesSlice';

const cx = classNames.bind(styles);

const StoriesCreatePage = () => {
  const { t } = useTranslation(['Stories']);
  const dispatch = useAppDispatch();
  const { currentStoriesOption } = useAppSelector((state) => state.stories);

  const handleBeforeUpload = useCallback(
    async (file: any) => {
      file.preview = URL.createObjectURL(file);
      dispatch(setPreviewStory(file));
      dispatch(setStoriesOption(StoriesOption.IMAGE));
    },
    [dispatch],
  );

  return (
    <div className={cx('wrapper')}>
      {!currentStoriesOption ? (
        <div className={cx('body')}>
          <ImgCrop rotationSlider quality={1} aspect={0.6}>
            <Upload accept="image/jpg, image/jpeg, image/png" beforeUpload={handleBeforeUpload}>
              <div className={cx('photo-str')}>
                <span className={cx('image')}>
                  <img src={ImagePhoto} alt="" />
                </span>
                <Typography.Title level={5} className={cx('text')}>
                  {t('Options.Option1')}
                </Typography.Title>
              </div>
            </Upload>
          </ImgCrop>
          <div className={cx('text-str')} onClick={() => dispatch(setStoriesOption(StoriesOption.TEXT))}>
            <span className={cx('image')}>
              <img src={FontPhoto} alt="" />
            </span>
            <Typography.Title level={5} className={cx('text')}>
              {t('Options.Option2')}
            </Typography.Title>
          </div>
        </div>
      ) : (
        false
      )}
      {currentStoriesOption ? <PreviewPanel /> : false}
    </div>
  );
};

export default StoriesCreatePage;
