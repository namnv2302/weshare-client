import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTE_PATH from '@constants/routes';

// pages
import HomePage from '@pages/Home';

type publicRoutesType = {
  path: string;
  component: React.FC;
  layout?: null | React.FC;
};

export const NavigateToNotFound = () => {
  return <Navigate to={ROUTE_PATH.NOT_FOUND} />;
};

export const NavigateToSignIn = () => {
  return <Navigate to={ROUTE_PATH.SIGN_IN} />;
};

export const publicRoutes: publicRoutesType[] = [
  {
    path: ROUTE_PATH.HOME,
    component: HomePage,
  },
];
