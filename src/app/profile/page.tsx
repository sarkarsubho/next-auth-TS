"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logOut = () => {
    try {
      axios.get(`/api/users/logout`);
      // use tost for successful message
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      // can add toast
    }
  };

  const getUserDetails = async () => {
    const res = await axios
      .get("/api/users/me")
      .then((res) => {
        return res;

        console.log(res.data);
        setData(res.data.user._id);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <div>
      <h1>Profile Page</h1>

      <h1>
        {" "}
        {data === "nothing" ? (
          "no data found"
        ) : (
          <Link href={`/profile/${data}`}>see details for user{data}</Link>
        )}
      </h1>
      <br></br>
      <button
        onClick={logOut}
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md mr-1"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md"
      >
        get user Dtails
      </button>
    </div>
  );
}
