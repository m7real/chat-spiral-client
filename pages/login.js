import Head from "next/head";
import { Inter } from "@next/font/google";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const { user, loading, setLoading, signInWithGoogle } = useContext(AuthContext);

  const saveUser = (name, email, photoURL) => {
    const user = { name, email, photoURL };
    fetch("https://chatspiral.onrender.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // login
  const handleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        toast.success("Login Successful");
        saveUser(user?.displayName, user?.email, user?.photoURL);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.code);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Chat Spiral</title>
      </Head>
      <section className={`flex flex-col justify-center items-center min-h-screen`}>
        <h2 className="text-3xl mb-10 text-stone-800 py-3 px-5 rounded-lg shadow-xl border-gray-500 border-b-2 font-serif">Chat Spiral</h2>
        <button onClick={handleLogin} className="btn btn-outline text-white shadow-2xl">
          <FcGoogle className="text-2xl mr-2" /> Login With Google
        </button>
      </section>
    </>
  );
}
