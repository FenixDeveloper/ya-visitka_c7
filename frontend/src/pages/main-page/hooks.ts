import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../../utils/api-config';
import { setTokens } from '../../utils/utils';

export const useGetAccessTokenByQueryCode = () => {
  const { search } = useLocation();

  const queryCode = useMemo(() => new URLSearchParams(search).get('code'), [search]);

  useEffect(() => {
    if (queryCode) {
      api.getToken(queryCode).then((data) => {
        setTokens(data);
      });
    }
  }, [queryCode]);
};
