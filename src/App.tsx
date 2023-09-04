import { Fragment, Suspense, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { publicRoutes } from '@constants/routers';
import DefaultLayout from '@layouts/DefaultLayout';
import { getAccessToken } from '@utils/localstorage';
import { whoAmI } from '@apis/auth';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout, login } from '@slices/authorizationSlice';
import ROUTE_PATH from '@constants/routes';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorization = useAppSelector((state) => state.authorization);

  useEffect(() => {
    (async () => {
      // if (getAccessToken() == null || !authorization) {
      //   navigate(ROUTE_PATH.SIGN_IN);
      // }
      const resAuth = await whoAmI();
      if (resAuth.status === 200 && resAuth.data) {
        dispatch(login(resAuth.data.data));
      } else {
        dispatch(logout());
      }
    })();
  }, [dispatch, authorization, navigate]);

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
            {publicRoutes.map((route) => {
              const Page = route.component;
              let Layout = DefaultLayout as any;
              if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={uuidV4()}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
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
