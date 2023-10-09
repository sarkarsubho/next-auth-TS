"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      console.log(user);

      const response = await axios.post(`/api/users/login`, user);

      console.log("login succcess", response.data);
      toast.success("login successFull");

      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("error message", error.message);
      alert(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
      // setLoading(false);
    } else {
      setButtonDisabled(true);
      // setLoading(true);
    }
  }, [user]);
  return (
    <div className="grid w-full h-screen place-items-center">
      <div className="flex flex-col w-48 text-center">
        <h1 className="text-3xl text-lime-800 font-semibold">
          {loading ? "processing..." : "Login"}
        </h1>

        <label>Email</label>
        <input
          type="email"
          id="email"
          className="p-2 border-gray-300 focus:border-gray-600 mb-4 text-black rounded-md"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label>Password</label>
        <input
          type="password"
          id="password"
          className="p-2 border-gray-300 focus:border-gray-600 mb-4 text-black rounded-md"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button onClick={onLogin} disabled={buttonDisabled}>
          {buttonDisabled ? "Enter all the details" : "login"}
        </button>
        <Link href={"/signup"}> Visit to signup page</Link>
      </div>
    </div>
  );
}
