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
    <Route path="/" element={<RootPage />} errorElement={<NotFoundPage />}>
      <Route index element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <MainPage />
        </ProtectedRoute>} />
      <Route path='*' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <NotFoundPage />
        </ProtectedRoute>} />
      <Route path='/cohort/:cohortId' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <MainPage />
        </ProtectedRoute>} />
      <Route path='login' element={<LoginPage />} />
      <Route path='profiles/:profileId' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <ProfileDetailsPage typePage='DEFAULT_PAGE'/>
        </ProtectedRoute>} />
      <Route path='edit' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <ProfileEditPage />
        </ProtectedRoute>} />
      <Route path='map'  element={
        <ProtectedRoute requiredStatus = {[UserStatus.Student, UserStatus.Curator]}>
          <MapPage />
        </ProtectedRoute>
      } 
      />  
      <Route path='admin' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Curator]}>
          <AdminCommentsPage />
        </ProtectedRoute>} />
      <Route path='admin/users' element={
        <ProtectedRoute requiredStatus = {[UserStatus.Curator]}>
          <AdminUsersPage />
        </ProtectedRoute>} 
      />
    </Route>
  ));
