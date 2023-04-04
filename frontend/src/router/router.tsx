import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ProfileDetailsPage } from '../pages/ProfileDetailsPage/ProfileDetailsPage';
import { MapPage } from '../pages/MapPage/MapPage';
import { ProfileEditPage } from '../pages/ProfileEditPage/ProfileEditPage';
import { AdminCommentsPage } from '../pages/AdminCommentsPage/AdminCommentsPage';
import { AdminUsersPage } from '../pages/AdminUsersPage/AdminUsersPage';
import { RootPage } from '../pages/RootPage/RootPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/cohort/:cohortId',
        element: <MainPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'profiles/:profileId',
        element: <ProfileDetailsPage />,
      },
      {
        path: 'edit',
        element: <ProfileEditPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'admin',
        element: <AdminCommentsPage />,
      },
      {
        path: 'admin/users',
        element: <AdminUsersPage />,
      },
    ]
  },
  
]);
