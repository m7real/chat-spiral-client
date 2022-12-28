import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { FcGoogle } from "react-icons/fc";
import Chat from "../components/Chat/Chat";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Navbar from "../components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const { user, loading } = useContext(AuthContext);

  if (!loading && !user) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>Chat Spiral</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Chat />
      </main>
    </>
  );
}
