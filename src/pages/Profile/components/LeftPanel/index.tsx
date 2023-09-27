import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Typography, message, Card } from 'antd';
import { MehOutlined } from '@ant-design/icons';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import classNames from 'classnames/bind';
import styles from './LeftPanel.module.scss';
import { updateUser } from '@apis/user';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { editBio as editBioAction } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const LeftPanel = () => {
  const { t } = useTranslation(['Profile']);
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [showEmojiModal, setShowEmojiModal] = useState<boolean>(false);
  const [bio, setBio] = useState<any>('');

  const addEmoji = useCallback(
    (e: any) => {
      console.log(e);
      const sym = e.unified.split('-');
      const codeArray: any = [];
      sym.forEach((el: any) => codeArray.push('0x' + el));
      let emoji = String.fromCodePoint(...codeArray);
      setBio(bio + emoji);
    },
    [bio],
  );

  const editBio = useCallback(async () => {
    setEditing(true);
    try {
      if (authorization) {
        const resp = await updateUser(authorization?.id, { bio: bio });
        if (resp.status === 200) {
          dispatch(editBioAction(bio));
          setEditing(false);
          setIsEdit(false);
          setBio('');
          message.success(t('Bio.Success'));
        }
      }
    } catch (error) {
      setEditing(false);
      message.error(t('Bio.Failed'));
    }
  }, [authorization, bio, dispatch, t]);

  return (
    <div className={cx('wrapper')}>
      <Card
        title={<Typography.Text className={cx('bio-title')}>{t('Bio.Label')}</Typography.Text>}
        className={cx('bio')}
      >
        <Typography.Text className={cx('bio-text')}>{authorization?.bio || t('Bio.NoData')}</Typography.Text>
        {!isEdit ? (
          <Button className="btn-default" onClick={() => setIsEdit(true)}>
            {t('Bio.Edit')}
          </Button>
        ) : (
          false
        )}
        {isEdit ? (
          <>
            <div className={cx('bio-wrap')}>
              <Input.TextArea
                className={cx('bio-input')}
                placeholder={t('Bio.Placeholder')}
                value={bio}
                onChange={(e: any) => setBio(e.target.value)}
              />
              <div className={cx('wrap-bio-icon')}>
                <MehOutlined className={cx('bio-icon')} onClick={() => setShowEmojiModal(!showEmojiModal)} />
                <div className={cx('wrap-emoji', { show: showEmojiModal })}>
                  <Picker
                    data={data}
                    onEmojiSelect={addEmoji}
                    showPreview={false}
                    showSkinTones={false}
                    previewPosition="none"
                  />
                </div>
              </div>
            </div>
            <Button className="btn-default mt-8" loading={editing} onClick={editBio}>
              {t('Bio.Confirm')}
            </Button>
          </>
        ) : (
          false
        )}
      </Card>
    </div>
  );
};

export default LeftPanel;
