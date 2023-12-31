import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTE_PATH from '@constants/routes';

import StoriesCreateLayout from '@layouts/StoriesCreateLayout';
import HeaderLayout from '@layouts/HeaderLayout';
import StoriesLayout from '@layouts/StoriesLayout';

// pages
import SignInPage from '@pages/SignIn';
import RegisterPage from '@pages/Register';
import HomePage from '@pages/Home';
import ProfilePage from '@pages/Profile';
import UserPage from '@pages/User';
import StoriesPage from '@pages/Stories';
import StoriesCreatePage from '@pages/StoriesCreate';
import StoriesDetailPage from '@pages/StoriesDetail';
import NotFoundPage from '@pages/NotFound';
import SignInSuccessPage from '@pages/SignInSuccess';
import VerifyEmailPage from '@pages/VerifyEmail';

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
    path: ROUTE_PATH.REGISTER,
    component: RegisterPage,
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
    path: ROUTE_PATH.STORIES,
    component: StoriesPage,
    layout: StoriesLayout,
  },
  {
    path: ROUTE_PATH.STORIES_CREATE,
    component: StoriesCreatePage,
    layout: StoriesCreateLayout,
  },
  {
    path: ROUTE_PATH.STORIES_DETAIL,
    component: StoriesDetailPage,
    layout: StoriesLayout,
  },
  {
    path: ROUTE_PATH.LOGIN_SUCCESS,
    component: SignInSuccessPage,
  },
  {
    path: ROUTE_PATH.VERIFY_EMAIL,
    component: VerifyEmailPage,
    layout: null,
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
