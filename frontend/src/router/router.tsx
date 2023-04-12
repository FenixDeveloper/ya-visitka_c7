import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RootPage } from '../pages/RootPage/RootPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ProfileDetailsPage } from '../pages/ProfileDetailsPage/ProfileDetailsPage';
import { MapPage } from '../pages/MapPage/MapPage';
import { ProfileEditPage } from '../pages/ProfileEditPage/ProfileEditPage';
import { AdminCommentsPage } from '../pages/AdminCommentsPage/AdminCommentsPage';
import { AdminUsersPage } from '../pages/AdminUsersPage/AdminUsersPage';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { UserStatus } from '../services/types/data';

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
      <Route path='login' element={<LoginPage />} />
      {/* // ? стр. профиля студунта */}
      <Route path='profiles/:profileId' element={
        <ProtectedRoute requiredStatus={[UserStatus.Student, UserStatus.Curator]}>
          <ProfileDetailsPage typePage='DEFAULT_PAGE' />
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
