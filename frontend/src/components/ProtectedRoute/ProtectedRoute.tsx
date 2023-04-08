import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserStatus } from '../../services/types/data';
import { ProfileContext } from '../../services/profileContext';

interface IProtectedRoute {
    requiredStatus: UserStatus[];
    redirectRoute?: string;
    children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ 
  requiredStatus,  
  redirectRoute = '/login', 
  children 
}) => {
  const profileContext = useContext(ProfileContext);
  const userStatus = profileContext.user.status;
  if (requiredStatus.includes(userStatus)) {
    return <>
      {children}
    </>;
  } else 
    return (<Navigate to={redirectRoute} replace />);
};
