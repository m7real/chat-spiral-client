import { Toaster } from "react-hot-toast";
import AuthProvider from "../contexts/AuthProvider";
import ChatProvider from "../contexts/ChatProvider";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ChatProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster />
      </AuthProvider>
    </ChatProvider>
  );
}
