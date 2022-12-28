import { Toaster } from "react-hot-toast";
import AuthProvider from "../contexts/AuthProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}
