import React, { useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api-config';
import { setToken } from '../../utils/utils';
import { ProfileContext } from '../../services/profile-context';

export const useGetAccessTokenByQueryCode = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [profileState, setProfileState] = React.useContext(ProfileContext);
  const queryCode = useMemo(() => new URLSearchParams(search).get('code'), [search]);

  useEffect(() => {
    if (queryCode) {
      const fetchGetToken = async () => {
        await api.getToken(queryCode).then((data) => {
          setToken(data.token);
          api.accessToken = `Bearer ${data.token}`;
        });
        await api.getUserAuth().then(user => {
          setProfileState({ ...profileState, user })
        })
      }

      fetchGetToken().catch(err => {
        navigate('/login');
      });
    }
    if (!localStorage.getItem('accessToken') && !queryCode) {
      navigate('/login');
    }
  }, []);

};
