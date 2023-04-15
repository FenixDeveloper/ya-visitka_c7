import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RootPage } from '../pages/rootPage1/rootPage1';
import { MainPage } from '../pages/mainPage1/mainPage1';
import { NotFoundPage } from '../pages/notFoundPage1/notFoundPage1';
import { LoginPage } from '../pages/loginPage1/loginPage1';
import { ProfileDetailsPage } from '../pages/profileDetailsPage1/profileDetailsPage1';
import { MapPage } from '../pages/mapPage1/mapPage1';
import { ProfileEditPage } from '../pages/profileEditPage1/profileEditPage1';
import { AdminCommentsPage } from '../pages/adminCommentsPage1/adminCommentsPage1';
import { AdminUsersPage } from '../pages/adminUsersPage1/adminUsersPage1';
import { ProtectedRoute } from '../components/protectedRoute1/protectedRoute1';
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
