import { useCookies } from 'react-cookie';

export const useGetToken = () => {
  const [cookies] = useCookies(["access_token"]);
  console.log('Retrieved Token:', cookies.access_token);

  if (!cookies.access_token) {
    console.warn('Token is undefined');
  }

  return { headers: { Authorization: `Bearer ${cookies.access_token}` || '' } };
};
