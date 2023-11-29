import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Spin, Typography, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './VerifyEmail.module.scss';
import { verifyEmail } from '@apis/auth';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const VerifyEmailPage = () => {
  const { t } = useTranslation('Common');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async () => {
      try {
        if (!token) return;
        setLoading(true);
        const resp = await verifyEmail(token);
        if (resp.status !== 200) {
          throw new Error(resp.data?.message || resp.statusText);
        }
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    })();
  }, [token]);

  return (
    <div className={cx('wrapper')}>
      <Typography.Title level={5} className={cx('title')}>
        {t('VerifyEmail.Title')}
      </Typography.Title>
      <div className={cx('content')}>
        {loading ? (
          <Spin />
        ) : !error ? (
          <>
            <CheckCircleOutlined className={cx('icon')} style={{ color: 'rgb(40,201,55)' }} />
            <Typography.Text className={cx('text-success')}>{t('VerifyEmail.Success.Message')}</Typography.Text>
            <Button type="primary" className={cx('back-login')} onClick={() => navigate(ROUTE_PATH.SIGN_IN)}>
              {t('VerifyEmail.Success.BackToLogin')}
            </Button>
          </>
        ) : (
          <>
            <CloseCircleOutlined className={cx('icon')} style={{ color: 'rgb(236,0,0)' }} />
            <Typography.Text className={cx('text-error')}>
              {t('VerifyEmail.Failed.Message', { extra: error?.message })}
            </Typography.Text>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
