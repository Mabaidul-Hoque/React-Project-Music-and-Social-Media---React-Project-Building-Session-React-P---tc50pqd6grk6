"use client";

import { signup } from "@/Apis/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import Link from "next/link";
import { Stack } from "@mui/material";

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
    <>
      <Stack flexDirection={"row"} justifyContent={"center"} mt={4} mb={4}>
        <div class="login-form">
          <div class="login-text">SIGNUP</div>
          <form>
            <div class="field">
              <div class="fas fa-envelope"></div>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                value={name}
                placeholder="Name"
                required
              />
            </div>
            <div class="field">
              <div class="fas fa-envelope"></div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
                placeholder="Email or Phone"
              />
            </div>
            <div class="field">
              <div class="fas fa-lock"></div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
                placeholder="Password"
              />
            </div>
            <button onClick={onSubmit}>SIGNUP</button>
            <div class="link">
              Already Registered? <Link href={"/signin"}>Sign In</Link>
            </div>
          </form>
        </div>
      </Stack>
    </>
  );
}
