import { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import { NextPage, NextPageAuth } from 'next';
import Router from 'next/router';
import { AppProps } from 'next/app';
import nProgress from 'nprogress';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import MuiTheme from 'theme/MuiTheme';
import OpenGraphTags from 'utils/OpenGraphTags';
import { AppProvider } from 'contexts/AppContext';
import SettingsProvider from 'contexts/SettingContext';
import SnackbarProvider from 'components/SnackbarProvider';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'react-redux';

import 'nprogress/nprogress.css';
import 'simplebar-react/dist/simplebar.min.css';
import '../src/__server__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import store from 'redux/store';
import AuthProvider from 'providers/AuthProvider';
import {SnackbarUtilsConfigurator} from 'utils/Snackbar';
import 'styles/global.css'


//Binding events.
Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());
// small change
nProgress.configure({ showSpinner: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageAuth & { getLayout?: (page: ReactElement) => ReactNode };
}

const App = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>Liveme - Shop</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <MuiTheme>
          <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <SessionProvider session={session} refetchOnWindowFocus={false}>
                  <AuthProvider Component={Component}>
                      {getLayout(<Component {...pageProps} />)}
                  </AuthProvider>
                </SessionProvider>
              </Provider>
            </QueryClientProvider>
            </SnackbarProvider>
          </MuiTheme>
        </AppProvider>
      </SettingsProvider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App);
