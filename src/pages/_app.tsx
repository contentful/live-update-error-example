import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode
      enableLiveUpdates
      targetOrigin="http://localhost:3001"
      locale={"en-US"}
    >
      <Component {...pageProps} />
    </ContentfulLivePreviewProvider>
  );
}
