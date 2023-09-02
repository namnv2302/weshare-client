import { useCallback } from 'react';
import classNames from 'classnames/bind';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss';
import LogoImage from '@assets/images/logo.png';
import GoogleImage from '@assets/images/google.png';
import BgImage from '@assets/images/bg-login.jpg';
import ROUTE_PATH from '@constants/routes';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const [form] = Form.useForm();

  const handleLogin = useCallback(() => {}, []);

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
                name="email"
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
                <Button type="primary" htmlType="submit" className={cx('login')}>
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
