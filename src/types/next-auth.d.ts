import { Session } from 'next-auth';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: ISession;
  }
}
