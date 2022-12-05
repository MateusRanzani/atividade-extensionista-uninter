import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NavBar from "../components/navBar";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/news.css";
import "../styles/events.css";
import "../components/navBar/navBar.css";
import "../styles/newsComponent.css";
import "../styles/profile.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar />
      
      <Component {...pageProps} className="componentPage" />
    </SessionProvider>
  );
}

export default MyApp;
