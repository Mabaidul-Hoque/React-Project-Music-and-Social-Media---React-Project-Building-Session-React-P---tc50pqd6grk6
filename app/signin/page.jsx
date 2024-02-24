"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import { signin } from "@/Apis/user";
import Link from "next/link";
import "../../components/styles/loginSignup.css";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && passRegex.test(password)) {
      if (regex.test(email)) {
        const data = await signin({ email, password });
        if (data && data?.status === "success") {
          toast.success("You have Signed in successfully", {
            theme: "colored",
          });
          localStorage.setItem("token", data.token);
          setToken(data.token);
          router.push("/");
        } else {
          toast.error("Incorrect EmailId or Password", {
            theme: "colored",
          });
        }
      } else {
        toast.error("Invalid email !", {
          theme: "colored",
        });
      }
    } else {
      toast.error("Fill all the input details !", {
        theme: "colored",
      });
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     router.push("/");
  //   }
  // }, [token]);

  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"center"} mt={4} mb={4}>
        <div className="login-form">
          <div className="login-text">LOGIN</div>
          <form>
            <div className="field">
              <div className="fas fa-envelope"></div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
                placeholder="Email"
                // required
              />
            </div>
            <div className="field">
              <div className="fas fa-lock"></div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
                placeholder="Password"
                // required
              />
            </div>
            <button onClick={onSubmit}>LOGIN</button>
            <div className="link">
              New User? <Link href={"/signup"}>Sign Up</Link>
            </div>
          </form>
        </div>
      </Stack>
    </>
  );
}
