/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
  render() {
    const host = 'https://blog.sharetrip.net';
    const image = host + '/img/icons/android-chrome-512x512.png';
    const description = 'WYSIWYG Markdown Editor';
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
          {/* <meta name="description" content={description} /> */}

          {/* PWA */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/*
            > Always specify the theme color using the meta tag. Even though it can also be declared in the web app manifest file:
            > - Browsers only acknowledge the value from the web app manifest file once the user has added the page to their home screen.
            > - The theme-color meta tag overwrites the value specified in the web app manifest file so it allows for better individual page level customization.
            https://webhint.io/docs/user-guide/hints/hint-meta-theme-color/
          */}
          {/* This color is the default address bar color of Chrome */}
          <meta name="theme-color" content="#e6eaed"></meta>

          {/* Apple https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html */}
          <link
            rel="apple-touch-icon"
            href="/img/icons/apple-touch-icon-192x192.png"
            sizes="192x192"
          ></link>
          <link
            rel="apple-touch-icon"
            href="/img/icons/apple-touch-icon-180x180.png"
            sizes="180x180"
          ></link>
          <link
            rel="apple-touch-icon"
            href="/img/icons/apple-touch-icon-152x152.png"
            sizes="152x152"
          ></link>
          <meta name="apple-mobile-web-app-capable" content="yes"></meta>
          <link
            rel="stylesheet"
            href="https://cdn.materialdesignicons.com/4.4.95/css/materialdesignicons.min.css"
          ></link>
          {/* Mircosoft */}
          <meta name="msapplication-TileColor" content="#222222" />

          {/* Twitter https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards */}
          {/* <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={host} />
          <meta name="twitter:title" content="Rino" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} /> */}
          {/* <meta name="twitter:creator" content="@xxxxxxx" /> */}

          {/* Open Graph protocol https://ogp.me/ */}
          {/* <meta property="og:type" content="website" />
          <meta property="og:title" content="Rino" />
          <meta property="og:site_name" content="Rino" />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={host} />
          <meta property="og:image" content={image} /> */}

          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NFX5ZLC');
            `
            }}
          />
          {/* <!-- End Google Tag Manager --> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFX5ZLC"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getStaticProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getStaticProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  };
};
