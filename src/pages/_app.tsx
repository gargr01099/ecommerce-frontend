import '../styles/global.css';
import { AppProps } from "next/app";
import { PopupProvider } from "../context/PopupContext";
import Popup from "../components/Popup";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PopupProvider>
      <Component {...pageProps} />
      <Popup />
    </PopupProvider>
  );
};

export default MyApp;

