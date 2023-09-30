import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CirclePicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Input, Modal, Typography, message } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import classNames from 'classnames/bind';
import styles from './SiderLeft.module.scss';
import { StoriesOption } from '@slices/storiesSlice';
import { setBgColor, changeText, setStoriesOption, setPreviewStory } from '@slices/storiesSlice';
import ROUTE_PATH from '@constants/routes';
import { createStory } from '@apis/story';
import { uploadImage } from '@helpers/upload';

const cx = classNames.bind(styles);

const SiderLeft = () => {
  const { t } = useTranslation(['Stories']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [creating, setCreating] = useState<boolean>(false);
  const authorization = useAppSelector((state) => state.authorization);
  const { currentStoriesOption, currentBgColor, currentText, previewStory } = useAppSelector((state) => state.stories);

  const handleCancel = useCallback(() => {
    dispatch(setBgColor('#1b79e5'));
    dispatch(setStoriesOption(null));
    dispatch(changeText(''));
    if (previewStory && previewStory.preview) {
      URL.revokeObjectURL(previewStory.preview);
      dispatch(setPreviewStory(null));
    }
    navigate(ROUTE_PATH.HOME);
  }, [dispatch, navigate, previewStory]);

  const confirm = useCallback(() => {
    Modal.confirm({
      title: t('DiscardModal.Title'),
      content: (
        <>
          <Divider style={{ margin: '14px 0' }} />
          <Typography.Text className={cx('discard-modal-desc')}>{t('DiscardModal.Desc')}</Typography.Text>
        </>
      ),
      okText: t('DiscardModal.Discard'),
      cancelText: t('DiscardModal.Continue'),
      okButtonProps: { className: cx('ok-button') },
      cancelButtonProps: { className: cx('cancel-button') },
      onOk: handleCancel,
    });
  }, [t, handleCancel]);

  const handleShare = useCallback(async () => {
    if (currentStoriesOption === StoriesOption.TEXT) {
      if (!currentText.trim()) {
        message.info(t('Button.Info'));
        return;
      }
      try {
        setCreating(true);
        const resp = await createStory({ text: currentText, bgColor: currentBgColor });
        if (resp.status === 201) {
          setCreating(false);
          navigate(ROUTE_PATH.HOME);
          message.success(t('Button.Success'));
          handleCancel();
        }
      } catch (error) {
        message.success(t('Button.Failed'));
      }
    }
    if (currentStoriesOption === StoriesOption.IMAGE) {
      try {
        setCreating(true);
        const storyResult = await uploadImage(previewStory);
        const resp = await createStory({ storyUrl: storyResult, type: StoriesOption.IMAGE });
        if (resp.status === 201) {
          setCreating(false);
          navigate(ROUTE_PATH.HOME);
          message.success(t('Button.Success'));
          handleCancel();
        }
      } catch (error) {
        message.success(t('Button.Failed'));
      }
    }
  }, [currentBgColor, currentText, t, navigate, currentStoriesOption, handleCancel, previewStory]);

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
            <Button className={cx('btn-default', 'discard')} onClick={confirm}>
              {t('Button.Discard')}
            </Button>
            <Button
              className={cx('btn-default', 'share', {
                disable: !currentText.trim() && currentStoriesOption === StoriesOption.TEXT,
              })}
              loading={creating}
              onClick={handleShare}
            >
              {t('Button.Share')}
            </Button>
          </div>
        </>
      ) : (
        false
      )}
      {currentStoriesOption === StoriesOption.IMAGE ? (
        <div className={cx('button')}>
          <Button className={cx('btn-default', 'discard')} onClick={confirm}>
            {t('Button.Discard')}
          </Button>
          <Button className={cx('btn-default', 'share')} loading={creating} onClick={handleShare}>
            {t('Button.Share')}
          </Button>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default SiderLeft;
