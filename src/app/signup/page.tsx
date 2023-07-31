"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      console.log(user);

     await axios.post(`/api/users/signup`, user).then((res) => {
        console.log(res.data);

        router.push("/login");
      });
    } catch (error: any) {
      toast.error(error.message);
      console.log("error message", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
      // setLoading(false)
    } else {
      setButtonDisabled(true);
      // setLoading(true)
    }
  }, [user]);

  return (
    <div className="grid w-full h-screen place-items-center">
      <div className="flex flex-col w-48 text-center">
        <h1 className="text-3xl text-lime-800 font-semibold">{loading?"processing..." : "Signup"}</h1>
        <label>username</label>
        <input
          type="text"
          id="username"
          className="p-2 border-gray-300 focus:border-gray-600 mb-4 text-black rounded-md"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

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
        <button onClick={onSignup} disabled={buttonDisabled}>
          {buttonDisabled ? "Enter all the details" : "Signup"}
        </button>
        <Link href={"/login"}> Visit to login page</Link>
      </div>
    </div>
  );
}
