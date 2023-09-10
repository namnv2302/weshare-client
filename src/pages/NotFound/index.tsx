import { Button, Result } from 'antd';
import ROUTE_PATH from '@constants/routes';
import { useAppSelector } from 'redux/hooks';

const NotFoundPage = () => {
  const authorization = useAppSelector((state) => state.authorization);

  return (
    <Result
      style={{ marginTop: '64px' }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      className="not-found-page"
      extra={
        <Button type="primary" href={authorization ? ROUTE_PATH.HOME : ROUTE_PATH.SIGN_IN}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
