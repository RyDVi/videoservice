import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { SWRConfig } from "swr";
import { axiosInstance } from "@modules/api";
import { Theme } from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Theme>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <SessionProvider session={csrfToken?.toString() || null}> */}
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
          <Component {...pageProps} />
        </SWRConfig>
        {/* </SessionProvider> */}
      </Theme>
    </CacheProvider>
  );
}
