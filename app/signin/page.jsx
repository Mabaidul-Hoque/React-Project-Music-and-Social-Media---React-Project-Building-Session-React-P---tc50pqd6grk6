"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import { signin } from "@/Apis/user";
import Link from "next/link";
import "../../components/styles/loginSignup.css";

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
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <span>Login Form</span>
        </div>
        <form action="#">
          <div class="row">
            <i class="fas fa-user"></i>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              value={email}
              placeholder="Email or Phone"
              required
            />
          </div>
          <div class="row">
            <i class="fas fa-lock"></i>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              value={password}
              placeholder="Password"
              required
            />
          </div>

          <div class="row button">
            <input onClick={onSubmit} type="submit" value="Login" />
          </div>
          <div class="signup-link">
            New User? <Link href={"/signup"}>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
