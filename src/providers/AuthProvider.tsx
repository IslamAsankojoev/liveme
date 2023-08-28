import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useActions } from 'hooks/useActions';
import PageLoader from 'components/Loader/PageLoader';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<any> = ({ children, Component: { isAdmin, isManager, isClient } }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <PageLoader/>;

  return !isAdmin && !isManager && !isClient ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isAdmin, isManager, isClient }}>{children}</DynamicCheckRole>
  );
};

export default AuthProvider;
