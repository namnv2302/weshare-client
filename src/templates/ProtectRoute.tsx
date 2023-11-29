import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { NavigateToSignIn } from '@constants/routers';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const authorization = useAppSelector((state) => state.authorization);

  if (!authorization && pathname !== '/register') {
    <NavigateToSignIn />;
  }

  return children;
};

export default ProtectRoute;
