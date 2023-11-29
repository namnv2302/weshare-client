import { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './Register.module.scss';
import LogoImage from '@assets/images/logo.png';
import GoogleImage from '@assets/images/google.png';
import BgImage from '@assets/images/bg-login.jpg';
import ROUTE_PATH from '@constants/routes';
import { useAppSelector } from 'redux/hooks';
import { register } from '@apis/auth';

const cx = classNames.bind(styles);

type RegisterDataType = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const authorization = useAppSelector((state) => state.authorization);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = useCallback(
    async ({ name, email, password }: RegisterDataType) => {
      setLoading(true);
      const resp = await register(name, email, password);
      if (resp.status === 201) {
        navigate(ROUTE_PATH.SIGN_IN);
        message.success('Create a account success. Login now!!');
      } else {
        message.error('Account existed!');
      }
      setLoading(false);
    },
    [navigate],
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
          <h1 className={cx('heading')}>Tạo tài khoản WeShare</h1>
          <div className={cx('provider')}>
            <span className={cx('google')}>
              <img src={GoogleImage} alt="Google" />
            </span>
          </div>
          <p className={cx('description')}>Hoặc đăng ký với thông tin của bạn:</p>
          <div className={cx('form')}>
            <Form name="login" form={form} autoComplete="off" onFinish={handleRegister}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                  {
                    min: 6,
                    message: 'Name minimum 6 characters!',
                  },
                ]}
              >
                <Input className={cx('input')} placeholder="Name" autoComplete="off" />
              </Form.Item>
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
                <Button loading={loading} type="primary" htmlType="submit" className={cx('register')}>
                  Register
                </Button>
                <Button type="primary" ghost className={cx('login')} onClick={() => navigate(ROUTE_PATH.SIGN_IN)}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
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

export default RegisterPage;
