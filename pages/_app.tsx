import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/navBar";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/news.css";
import "../components/navBar/navBar.css"
import "../styles/newsComponent.css"

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
       <NavBar/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
