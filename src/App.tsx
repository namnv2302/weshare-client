import React, { Fragment, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import { publicRoutes } from '@constants/routers';
import DefaultLayout from '@layouts/DefaultLayout';

function App() {
  return (
    <ConfigProvider
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
