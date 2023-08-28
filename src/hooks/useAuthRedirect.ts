import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
  // const { data: session, status } = useSession();

  // const router = useRouter();

  // let redirect = !!router.query.redirect ? String(router.query.redirect) : '/profile';
  // if (redirect === '/') redirect = '/profile';

  // useEffect(() => {
  //   if (!!session?.user?.id) {
  //     router.push(redirect)
  //   }
  // }, [status, session, router, redirect]);
  return null;
};
