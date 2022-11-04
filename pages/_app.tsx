import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ImageProvider } from "../components/stores/image";
import { ResourceProvider } from "../components/stores/resource";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ResourceProvider>
      <ImageProvider>
        <Component {...pageProps} />
      </ImageProvider>
    </ResourceProvider>
  );
}
