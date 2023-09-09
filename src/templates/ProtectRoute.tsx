import { useAppSelector } from 'redux/hooks';
import { NavigateToSignIn } from '@constants/routers';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const authorization = useAppSelector((state) => state.authorization);

  if (!authorization) {
    <NavigateToSignIn />;
  }

  return children;
};

export default ProtectRoute;
