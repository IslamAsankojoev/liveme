import { FC } from 'react';
import Head from 'next/head';

// ====================================================================
type SEOProps = {
  title: string;
  sitename?: string;
  description?: string;
};
// ====================================================================

const SEO: FC<SEOProps> = ({ title, description, sitename = 'Livemeshop' }) => {
  return (
    <Head>
      <title>{`${title} | ${sitename}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;
