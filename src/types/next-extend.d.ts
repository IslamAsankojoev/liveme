import { NextPage } from 'next';
import { ReactNode } from 'react';
import { QueryClient } from 'react-query';

export type TypeRoles = {
  isAdmin?: boolean;
  isManager?: boolean;
  isClient?: boolean;
};

type OtherTypes = {
  getLayout?: getLayout;
  queryClient?: QueryClient;
};

declare module 'next' {
  type NextPageAuth<P = {}> = NextPage<P> & TypeRoles & OtherTypes;
}

// export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles & OtherTypes;


declare module 'next' {
  type TypeComponentAuthFields = { Component: TypeRoles; children: ReactNode };
}
