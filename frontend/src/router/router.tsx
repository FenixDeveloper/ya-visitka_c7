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
import { AdminPage } from '../pages/admin-page/admin-page';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { UserStatus } from '../services/types/data';
import { CURRENT_REDIRECT_URI } from '../utils/constants';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootPage />}>
      {/* // ? стр. визиток (главная) */}
      <Route index element={<MainPage />}/>
      {/* // ? все стр. которых нет */}
      <Route path='*' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <NotFoundPage />
        </ProtectedRoute>} />
      {/* // ? когорта */}
      <Route path='cohort/:cohortId' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <MainPage />
        </ProtectedRoute>} />
      {/* // ? стр. авторизации */}
      <Route path='login' element={<LoginPage redirectUri={CURRENT_REDIRECT_URI} />} />
      {/* // ? стр. профиля студунта */}
      <Route path='profiles/:profileId' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <ProfileDetailsPage />
        </ProtectedRoute>} />
      {/* // ? стр. редактирования профиля */}
      <Route path='edit' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <ProfileEditPage />
        </ProtectedRoute>} />
      {/* // ? стр. с картой */}
      <Route path='map' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <MapPage />
        </ProtectedRoute>} />
      {/* // ? стр. администрации - комментарии */}
      <Route path='admin/comments' element={
        <ProtectedRoute requiredStatus={[UserStatus.CURATOR]}>
          <AdminCommentsPage />
        </ProtectedRoute>} />
      {/* // ? стр. администрации - студенты */}
      <Route path='admin/users' element={
        <ProtectedRoute requiredStatus={[UserStatus.CURATOR]}>
          <AdminUsersPage />
        </ProtectedRoute>}
      />
      {/* // ? стр. администрации - для смены токена */}
      <Route path='admin/' element={
        <ProtectedRoute requiredStatus={[UserStatus.Curator]}>
          <AdminPage />
        </ProtectedRoute>}
      />  
    </Route>
  ));
