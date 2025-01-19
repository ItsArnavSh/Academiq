"use client";
import Cookies from "js-cookie";
import type React from "react";
import { useState } from "react";
import Icon from "./logo";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Cookies.set("user", JSON.stringify({ email: email }), {
        expires: 7,
      }); // Expires in 7 days
      router.push("/ContestList");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="w-9 mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-40">
            <form onSubmit={signIn}>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg font-medium	text-4xl">
                  Sign in with
                </p>

                <Icon
                  img={
                    "https://tse4.mm.bing.net/th?id=OIP.D6P-BO32wCApcPIIjt6p5wHaHa&pid=Api&P=0&h=220"
                  }
                />
                <Icon
                  img={
                    "https://tse4.mm.bing.net/th?id=OIP.eJqR2-uHIz8cSuE-OWpk-wHaHa&pid=Api&P=0&h=220"
                  }
                />
              </div>

              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-black">
                  Or
                </p>
              </div>

              {/* <!-- Email and password input --> */}
              <input
                className="w-full p-4 border"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="w-full p-4 m-2 border"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* <!-- Error message --> */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-block rounded bg-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don`t have an account?{" "}
                  <a
                    href="/Signup"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
