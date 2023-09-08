import { NavigateToSignIn } from '@constants/routers';
import { useAppSelector } from 'redux/hooks';

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const authorization = useAppSelector((state) => state.authorization);

  if (!authorization) {
    return <NavigateToSignIn />;
  }

  return children;
};

export default ProtectRoute;
