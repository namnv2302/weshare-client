import { useCallback, useEffect, useMemo } from 'react';
import { Divider, Dropdown, Space, Typography } from 'antd';
import { BellOutlined, BookOutlined, DownOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './RightPanel.module.scss';
import DefaultAvatar from '@assets/images/avatar.jpg';
import { SUPPORTED_LOCALES } from '@constants/locales';

const cx = classNames.bind(styles);

const RightPanel = () => {
  const { t, i18n } = useTranslation(['Home']);

  const languagesOption = useMemo(() => {
    return SUPPORTED_LOCALES.map(({ value, label }) => ({ key: value, label }));
  }, []);

  const handleLangChange = useCallback(
    ({ key }: { key: string }) => {
      i18n.changeLanguage(key);
    },
    [i18n],
  );

  const currentLang = SUPPORTED_LOCALES.find(({ value }) => value === i18n.language);

  useEffect(() => {
    if (!currentLang) i18n.changeLanguage(SUPPORTED_LOCALES[0].value);
  }, [currentLang, i18n]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography.Text>{t('Profile')}</Typography.Text>,
    },
    {
      key: '2',
      label: <Typography.Text>{currentLang?.label}</Typography.Text>,
      children: languagesOption,
      onClick: handleLangChange,
    },
    {
      key: '3',
      label: (
        <>
          <Divider style={{ margin: '0 0 5px' }} />
          <Typography.Text>{t('Logout')}</Typography.Text>
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
      <Dropdown menu={{ items }}>
        <div className={cx('avatar-info')}>
          <img src={DefaultAvatar} alt="Avatar" className={cx('avatar')} />
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            Jakob Botosh
          </Typography.Title>
          <DownOutlined className={cx('icon-down')} />
        </div>
      </Dropdown>
    </div>
  );
};

export default RightPanel;
