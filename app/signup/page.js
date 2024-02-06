"use client";

import { signup } from "@/apis/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import Link from "next/link";

export default function SignUp() {
  // const [userInfo, setUserInfo] = useState({
  //     name: "",
  //     email: "",
  //     password: ""
  // })
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);

  const onSubmit = async () => {
    if (name && email && password) {
      const data = await signup({
        name,
        email,
        password,
      });
      if (data.status === "success") {
        alert("User registered successfully");
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
        <label>Name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
        />
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
          Sign up
        </button>
        <h4>
          Already Registered? <Link href={"/signin"}>Sign In</Link>
        </h4>
      </div>
    </div>
  );
}
