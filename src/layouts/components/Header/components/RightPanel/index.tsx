import { useCallback, useEffect, useMemo } from 'react';
import { Divider, Dropdown, Popconfirm, Space, Typography, message, Badge } from 'antd';
import { BellOutlined, MessageOutlined } from '@ant-design/icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './RightPanel.module.scss';
import DefaultAvatar from '@assets/images/avatar_default.jpeg';
import { SUPPORTED_LOCALES } from '@constants/locales';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { logout } from '@apis/auth';
import { logout as logoutAction } from '@slices/authorizationSlice';
import ROUTE_PATH from '@constants/routes';
import { clearLocalstorageToken } from '@utils/localstorage';
import Messenger from '@components/Messenger';
import { openMessenger } from '@slices/settingsSlice';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t, i18n } = useTranslation(['Home', 'Common']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpenMessenger } = useAppSelector((state) => state.settings);
  const authorization = useAppSelector((state) => state.authorization);
  const { notificationNewMessage } = useAppSelector((state) => state.chats);

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
    clearLocalstorageToken();
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
      label: (
        <Typography.Text className="text-default" style={{ display: 'block', padding: '3px 0' }}>
          {t('Profile')}
        </Typography.Text>
      ),
      onClick: () => navigate(ROUTE_PATH.PROFILE.replace(':slug', `${authorization?.slug}`)),
    },
    {
      key: '2',
      label: (
        <Typography.Text className="text-default" style={{ display: 'block', padding: '3px 0' }}>
          {currentLang?.label}
        </Typography.Text>
      ),
      children: languagesOption,
      onClick: handleLangChange,
    },
    {
      key: '3',
      label: (
        <>
          <Divider style={{ margin: '0 0 5px' }} />
          <Popconfirm
            title={t('Logout.Sure')}
            okText={t('Logout.Ok')}
            cancelText={t('Logout.Cancel')}
            onConfirm={handleLogout}
          >
            <Typography.Text className="text-default" style={{ display: 'block', padding: '3px 0' }}>
              {t('Logout')}
            </Typography.Text>
          </Popconfirm>
        </>
      ),
    },
  ];

  const renderResult = useCallback((attrs: any) => {
    return (
      <div tabIndex="-1" {...attrs}>
        <Messenger />
      </div>
    );
  }, []);

  return (
    <div className={cx('wrapper')}>
      <Space>
        <Tippy visible={isOpenMessenger} interactive delay={[0, 500]} placement="bottom" render={renderResult}>
          <Badge
            style={{ width: '16px', height: '19px' }}
            count={notificationNewMessage.length}
            overflowCount={20}
            color="#1b79e5"
            offset={[0, 3]}
          >
            <MessageOutlined className={cx('icon')} onClick={() => dispatch(openMessenger(!isOpenMessenger))} />
          </Badge>
        </Tippy>
      </Space>
      <Space>
        <BellOutlined className={cx('icon')} />
      </Space>
      <Dropdown menu={{ items }} overlayStyle={{ minWidth: '160px' }} placement="topRight">
        <div className={cx('avatar-info')}>
          <img src={authorization?.avatar || DefaultAvatar} alt="Avatar" className={cx('avatar')} />
          {/* <Typography.Title className={cx('name')} style={{ marginBottom: 0 }}>
            {authorization ? authorization.name : 'Jakob Botosh'}
          </Typography.Title> */}
          {/* <DownOutlined className={cx('icon-down')} /> */}
        </div>
      </Dropdown>
    </div>
  );
};

export default RightPanel;
