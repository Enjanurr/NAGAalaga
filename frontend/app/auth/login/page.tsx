'use client'

import { useState } from "react";
import publicApi from "@/utils/publicApi";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/authStore";
import Image from 'next/image'

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await publicApi.post("/api/auth/login", {
        userEmail: email,
        userPassword: password,
      });

      const { accessToken, message } = res.data;

      if (!accessToken) throw new Error("No access token returned");

      setToken(accessToken);
      setMessage(message ?? "Login successful");

      if (res.status === 200) {
        setTimeout(() => {
          router.push("/notes");
        }, 500);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px]  rounded-2xl space-x-2 overflow-hidden">

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto  flex items-center justify-center">
          <Image
      src="/assets/mainLogo.svg" // Path from the public directory
      alt="Logo"
      width={500} // Optional for static imports as they are inferred
      height={500} // Optional for static imports as they are inferred
    />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-8 flex flex-col justify-center gap-4"
        >
          <h1 className="text-3xl font-bold text-center mb-2 primary">Login</h1>

          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            No account yet?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </form>

      </div>
    </div>
  );
}
