import { useCallback, useEffect, useMemo } from 'react';
import { Divider, Dropdown, Popconfirm, Space, Typography, message } from 'antd';
import { BellOutlined, BookOutlined, DownOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './RightPanel.module.scss';
import DefaultAvatar from '@assets/images/avatar_default.jpg';
import { SUPPORTED_LOCALES } from '@constants/locales';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { logout } from '@apis/auth';
import { logout as logoutAction } from '@slices/authorizationSlice';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t, i18n } = useTranslation(['Home', 'Common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);

  const languagesOption = useMemo(() => {
    return SUPPORTED_LOCALES.map(({ value, label }) => ({
      key: value,
      label: <Typography.Text className="text-default">{label}</Typography.Text>,
    }));
  }, []);

  const handleLangChange = useCallback(
    ({ key }: { key: string }) => {
      i18n.changeLanguage(key);
    },
    [i18n],
  );

  const handleLogout = useCallback(async () => {
    await logout();
    dispatch(logoutAction());
    navigate(ROUTE_PATH.SIGN_IN);
    message.info(t('Logout.Success'));
  }, [dispatch, navigate, t]);

  const currentLang = SUPPORTED_LOCALES.find(({ value }) => value === i18n.language);

  useEffect(() => {
    if (!currentLang) i18n.changeLanguage(SUPPORTED_LOCALES[0].value);
  }, [currentLang, i18n]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography.Text className="text-default">{t('Profile')}</Typography.Text>,
    },
    {
      key: '2',
      label: <Typography.Text className="text-default">{currentLang?.label}</Typography.Text>,
      children: languagesOption,
      onClick: handleLangChange,
    },
    {
      key: '3',
      label: (
        <>
          <Divider style={{ margin: '0 0 5px' }} />
          <Popconfirm title={t('Logout.Sure')} onConfirm={handleLogout}>
            <Typography.Text className="text-default">{t('Logout')}</Typography.Text>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <Space>
        <BellOutlined className={cx('icon')} />
      </Space>
      <Space>
        <BookOutlined className={cx('icon')} />
      </Space>
      <Dropdown menu={{ items }} overlayStyle={{ minWidth: '160px' }} placement="topRight">
        <div className={cx('avatar-info')}>
          <img src={DefaultAvatar} alt="Avatar" className={cx('avatar')} />
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            {authorization ? authorization.name : 'Jakob Botosh'}
          </Typography.Title>
          <DownOutlined className={cx('icon-down')} />
        </div>
      </Dropdown>
    </div>
  );
};

export default RightPanel;
