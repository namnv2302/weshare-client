import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTE_PATH from '@constants/routes';

// pages
import HeaderLayout from '@layouts/HeaderLayout';
import SignInPage from '@pages/SignIn';
import HomePage from '@pages/Home';
import ProfilePage from '@pages/Profile';
import UserPage from '@pages/User';
import NotFoundPage from '@pages/NotFound';

type publicRoutesType = {
  path: string;
  component: React.FC;
  layout?: null | any;
};

export const NavigateToNotFound = () => {
  return <Navigate to={ROUTE_PATH.NOT_FOUND} />;
};

export const NavigateToSignIn = () => {
  return <Navigate to={ROUTE_PATH.SIGN_IN} />;
};

export const publicRoutes: publicRoutesType[] = [
  {
    path: ROUTE_PATH.SIGN_IN,
    component: SignInPage,
    layout: null,
  },
  {
    path: ROUTE_PATH.HOME,
    component: HomePage,
  },
  {
    path: ROUTE_PATH.PROFILE,
    component: ProfilePage,
    layout: HeaderLayout,
  },
  {
    path: ROUTE_PATH.USER,
    component: UserPage,
    layout: HeaderLayout,
  },
  {
    path: ROUTE_PATH.NOT_FOUND,
    component: NotFoundPage,
    layout: null,
  },
  {
    path: ROUTE_PATH.OTHER,
    component: NotFoundPage,
    layout: null,
  },
];
