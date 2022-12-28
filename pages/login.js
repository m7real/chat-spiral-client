import Head from "next/head";
import { Inter } from "@next/font/google";
import { FcGoogle } from "react-icons/fc";
import Router from "next/dist/server/router";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat Spiral</title>
      </Head>
      <section className={`flex flex-col justify-center items-center min-h-screen`}>
        <h2 className="text-3xl mb-10 text-stone-800 py-3 px-5 rounded-lg shadow-xl border-gray-500 border-b-2 font-serif">Chat Spiral</h2>
        <button className="btn btn-outline text-white shadow-2xl">
          <FcGoogle className="text-2xl mr-2" /> Login With Google
        </button>
      </section>
    </>
  );
}
