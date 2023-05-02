import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "src/createEmotionCache";
import { SWRConfig } from "swr";
import { Theme, ThemeLoader, ThemeSaver } from "@modules/theme";
import { NextPage } from "next";
import { PageProvider } from "@modules/crm";
import {
  AxiosContext,
  createRequestInstance,
  getCsrfConfig,
} from "@modules/request-hooks";

const axiosInstance = createRequestInstance(
  getCsrfConfig(process.env.NEXT_PUBLIC_SERVER_URL!),
  true
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Theme defaultTheme="dark">
        <ThemeSaver />
        <ThemeLoader />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SWRConfig
          value={{
            fetcher: (resource: string | [string, any], init) => {
              if (typeof resource === "string") {
                return axiosInstance
                  .get(resource, init)
                  .then((res) => res.data);
              }
              if (typeof resource === "object") {
                return axiosInstance
                  .get(resource[0], resource[1])
                  .then((res) => res.data);
              }
              throw new Error("I don't know how to process this resource");
            },
          }}
        >
          <AxiosContext.Provider value={axiosInstance}>
            <PageProvider>
              {getLayout(<Component {...pageProps} />)}
            </PageProvider>
          </AxiosContext.Provider>
        </SWRConfig>
      </Theme>
    </CacheProvider>
  );
}
