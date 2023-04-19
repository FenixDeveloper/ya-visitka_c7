import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RootPage } from '../pages/root-page/root-page';
import { MainPage } from '../pages/main-page/main-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { LoginPage } from '../pages/login-page/login-page';
import { ProfileDetailsPage } from '../pages/profile-details-page/profile-details-page';
import { MapPage } from '../pages/map-page/map-page';
import { ProfileEditPage } from '../pages/profile-edit-page/profile-edit-page';
import { AdminCommentsPage } from '../pages/admin-comments-page/admin-comments-page';
import { AdminUsersPage } from '../pages/admin-users-page/admin-users-page';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { UserStatus } from '../services/types/data';
import { CURRENT_REDIRECT_URI } from '../utils/constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      {/* // ? стр. визиток (главная) */}
      <Route index element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <MainPage />
        </ProtectedRoute>} />
      {/* // ? все стр. которых нет */}
      <Route path='*' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <NotFoundPage />
        </ProtectedRoute>} />
      {/* // ? когорта */}
      <Route path='cohort/:cohortId' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <MainPage />
        </ProtectedRoute>} />
      {/* // ? стр. авторизации */}
      <Route path='login' element={<LoginPage redirectUri={CURRENT_REDIRECT_URI} />} />
      {/* // ? стр. профиля студунта */}
      <Route path='profiles/:profileId' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <ProfileDetailsPage />
        </ProtectedRoute>} />
      {/* // ? стр. редактирования профиля */}
      <Route path='edit' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <ProfileEditPage />
        </ProtectedRoute>} />
      {/* // ? стр. с картой */}
      <Route path='map' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <MapPage />
        </ProtectedRoute>} />
      {/* // ? стр. администрации - комментарии */}
      <Route path='admin/comments' element={
        <ProtectedRoute requiredStatus={[UserStatus.Curator]}>
          <AdminCommentsPage />
        </ProtectedRoute>} />
      {/* // ? стр. администрации - студенты */}
      <Route path='admin/users' element={
        <ProtectedRoute requiredStatus={[UserStatus.Curator]}>
          <AdminUsersPage />
        </ProtectedRoute>}
      />
    </Route>
  ));
