import { useRouter } from 'next/router';
import { FC, memo, use, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { TypeComponentAuthFields } from 'next';
import Error404 from 'components/Error404';
import PageLoader from 'components/Loader/PageLoader';
import { useSnackbar } from 'notistack';
import { useActions } from 'hooks/useActions';

const CheckRole: FC<TypeComponentAuthFields> = ({
  children,
  Component: { isAdmin, isManager, isClient },
}) => {
  const { data: session, status, update } = useSession();
  const { enqueueSnackbar } = useSnackbar()
  const { getMe } = useActions();

  const router = useRouter();
  const memoChildren = useMemo(() => children, [children])

  const token = !!session?.user?.id;

  if (isAdmin && token && session?.user?.role.name === 'admin') {
    getMe()
    return <>{memoChildren}</>;
  }
  if (isManager && token && session?.user?.role.name === 'manager') {
    getMe();
    return <>{memoChildren}</>;
  }
  if (isClient && token) {
    getMe();
    return <>{memoChildren}</>;
  }

  // if(isClient && !token || isAdmin && !token || isManager && !token){
  //   enqueueSnackbar('Войдите в аккаунт', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
  //   router.push(`/login?redirect=${router.asPath}`);
  //   return <PageLoader/>;
  // } 
  // else if (isAdmin && token && session?.user?.role.name !== 'admin') {
  //   enqueueSnackbar('Доступ ограничен', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
  //   router.push('/profile');
  //   return <PageLoader/>
  // } 

  // else if (isManager && token && session?.user?.role.name !== 'manager') {
  //   enqueueSnackbar('Доступ ограничен', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } })
  //   router.push('/profile');
  //   return <PageLoader/>;
  // }

  return <>{children}</>

};

export default CheckRole;