import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ImageProvider } from "../components/stores/image";
import { ResourceProvider } from "../components/stores/resource";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ResourceProvider>
        <ImageProvider>
          <Component {...pageProps} />
        </ImageProvider>
      </ResourceProvider>
    </>
  );
}
