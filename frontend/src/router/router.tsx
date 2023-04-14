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
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <MainPage />
        </ProtectedRoute>} />
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
      <Route path='login' element={<LoginPage />} />
      {/* // ? стр. профиля студента */}
      <Route path='profiles/:profileId' element={
        <ProtectedRoute requiredStatus={[UserStatus.STUDENT, UserStatus.CURATOR]}>
          <ProfileDetailsPage />
        </ProtectedRoute>} />
      {/* // ? стр. редактирования профиля */}
      <Route path='profiles/:profileId/edit' element={
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
    </Route>
  ));
