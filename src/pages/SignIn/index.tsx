import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import LogoImage from '@assets/images/logo.png';
import GoogleImage from '@assets/images/google.png';
import BgImage from '@assets/images/bg-login.jpg';
import ROUTE_PATH from '@constants/routes';
import { login, whoAmI } from '@apis/auth';
import { saveAccessToken } from '@utils/localstorage';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { login as loginAction } from '@slices/authorizationSlice';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      setLoading(true);
      try {
        const res = await login(username, password);
        if (res.status === 201 && res.data) {
          saveAccessToken(res.data.data['access_token']);
          const resAuth = await whoAmI();
          if (resAuth.status === 200) {
            dispatch(loginAction(resAuth.data.data));
            navigate(ROUTE_PATH.HOME);
            message.success('Login success!');
          }
        } else {
          message.error('Email/Password incorrect!');
        }
        setLoading(false);
      } catch (error) {
        message.error('Email/Password incorrect!');
        setLoading(false);
      }
    },
    [navigate, dispatch],
  );

  if (authorization) {
    <Navigate to={ROUTE_PATH.HOME} />;
  }

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          <h3 className={cx('logo')}>
            <img src={LogoImage} alt="Logo" className={cx('logo-icon')} />
            WeShare
          </h3>
          <h1 className={cx('heading')}>Đăng nhập vào WeShare</h1>
          <div className={cx('provider')}>
            <span className={cx('google')}>
              <img src={GoogleImage} alt="Google" />
            </span>
          </div>
          <p className={cx('description')}>Hoặc đăng nhập với email và mật khẩu của bạn:</p>
          <div className={cx('form')}>
            <Form name="login" form={form} onFinish={handleLogin} autoComplete="off">
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid email format!' },
                ]}
              >
                <Input className={cx('input')} placeholder="Email" autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 6,
                    message: 'Password minimum 6 characters!',
                  },
                ]}
              >
                <Input.Password className={cx('input')} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" className={cx('login')}>
                  Login
                </Button>
                <Button type="primary" ghost className={cx('create')}>
                  Create account
                </Button>
              </Form.Item>
            </Form>
          </div>
          <p className={cx('forgot-pw')}>
            <Link to={ROUTE_PATH.HOME}>Quên mật khẩu?</Link>
          </p>
          <p className={cx('terms')}>
            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
            <span className={cx('highlight')}> Điều khoản sử dụng</span> của chúng tôi.
          </p>
        </div>
        <div className={cx('background')} style={{ backgroundImage: `url('${BgImage}')` }}></div>
      </div>
    </>
  );
};

export default SignInPage;
