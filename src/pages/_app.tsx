/**
 * The main Next.js application component that wraps the entire application.
 * It sets up the `PopupProvider` context and renders the `Popup` component.
 * This allows the application to manage and display popup modals throughout the app.
 */
import '../styles/global.css';
import { AppProps } from "next/app";
import { PopupProvider } from "../context/PopupContext";
import Popup from "../components/Popup";
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PopupProvider>
      <Component {...pageProps} />
      <Popup message={null} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </PopupProvider>
  );
};

export default MyApp;

