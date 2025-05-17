import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '../src/index.css';
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <DefaultSeo
        titleTemplate={`%s | ${SITE_NAME}`}
        defaultTitle={`${SITE_NAME} - Activated Carbon Cat Litter Additive`}
        description={SITE_DESCRIPTION}
        canonical="https://purrify.ca/"
        openGraph={{
          type: 'website',
          locale: 'en_CA',
          url: 'https://purrify.ca/',
          siteName: SITE_NAME,
          title: `${SITE_NAME} - Activated Carbon Cat Litter Additive`,
          description: SITE_DESCRIPTION,
          images: [
            {
              url: 'https://purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: '@purrify',
          site: '@purrify',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination',
          },
          {
            name: 'author',
            content: SITE_NAME,
          },
        ]}
      />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;