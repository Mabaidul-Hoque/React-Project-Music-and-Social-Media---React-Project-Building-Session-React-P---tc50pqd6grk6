"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import { signin } from "../../apis/user";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const onSubmit = async () => {
    if (email && password) {
      const data = await signin({
        email,
        password,
      });
      if (data.status === "success") {
        alert("User Signed in successfully");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        router.push("/");
      }
    } else {
      alert("Some field is missing or invalid");
    }
  };
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          gap: 10,
        }}
      >
        <label>Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          value={email}
        />
        <label>Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          value={password}
        />
        <button
          style={{
            marginTop: 20,
            border: "none",
            padding: 10,
            backgroundColor: "black",
            color: "white",
            fontSize: 20,
            marginBottom: 20,
          }}
          onClick={onSubmit}
        >
          Sign In
        </button>
        <h4>
          New User? <Link href={"/signup"}>Sign Up</Link>
        </h4>
      </div>
    </div>
  );
}
