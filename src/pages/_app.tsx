import { AppProps } from "next/app";
import '../styles/global.css';
import { PopupProvider } from "../context/PopupContext";
// import Popup from "../components/Popup";

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
