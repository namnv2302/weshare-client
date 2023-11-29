import { Fragment, Suspense, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { publicRoutes } from '@constants/routers';
import DefaultLayout from '@layouts/DefaultLayout';
import { getAccessToken } from '@utils/localstorage';
import { whoAmI } from '@apis/auth';
import { useAppDispatch } from 'redux/hooks';
import { logout, login } from '@slices/authorizationSlice';
import ProtectRoute from 'templates/ProtectRoute';
import ROUTE_PATH from '@constants/routes';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      if (getAccessToken() == null && pathname !== '/register' && pathname !== '/verify-email') {
        return navigate(ROUTE_PATH.SIGN_IN);
      }
      const resAuth = await whoAmI();
      if (resAuth.status === 200 && resAuth.data) {
        dispatch(login(resAuth.data.data));
      } else {
        dispatch(logout());
      }
    })();
  }, [dispatch, navigate, pathname]);

  return (
    <ConfigProvider
      prefixCls="ws"
      theme={{
        token: {
          fontFamily: 'Montserrat',
          fontSize: 16,
        },
      }}
    >
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            {publicRoutes.map(({ component, layout, path }) => {
              const Page = component;
              let Layout = DefaultLayout as any;
              if (layout != null) {
                Layout = layout;
              } else if (layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={uuidV4()}
                  path={path}
                  element={
                    <ProtectRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectRoute>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </div>
    </ConfigProvider>
  );
}

export default App;
