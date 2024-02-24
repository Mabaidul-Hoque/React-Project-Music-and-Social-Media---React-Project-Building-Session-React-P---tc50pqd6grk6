"use client";

import "../../components/styles/loginSignup.css";
import { signup } from "@/Apis/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../layout";
import Link from "next/link";
import { Stack } from "@mui/material";
import { toast } from "react-toastify";

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

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      if (regex.test(email) && passRegex.test(password)) {
        const data = await signup({ name, email, password });
        if (data?.status === "success") {
          toast.success("You have registered successfully", {
            theme: "colored",
          });

          if (typeof localStorage !== "undefined") {
            //  code that uses localStorage
            localStorage.setItem("token", data.token);
          } else {
            // Handle the case where localStorage is not available
            throw new Error("something is wrong with the local storage");
          }

          setToken(data.token);
          router.push("/");
        } else {
          toast.warn("Already you have an account", {
            theme: "colored",
          });
        }
      } else if (!regex.test(email)) {
        toast.error("Invalid email !", {
          theme: "colored",
        });
      } else {
        toast.error(
          "Invalid password, password should contain at least 8 characters which are combination of alphabets, numbers and special character !",
          {
            theme: "colored",
          }
        );
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
        <div className="signup-form">
          <div className="login-text">SIGNUP</div>
          <form>
            <div className="field">
              <div className="fas fa-envelope"></div>
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
            <div className="field">
              <div className="fas fa-envelope"></div>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
                placeholder="Email"
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
              />
            </div>
            <button onClick={onSubmit}>SIGNUP</button>
            <div className="link">
              Already Registered? <Link href={"/signin"}>Sign In</Link>
            </div>
          </form>
        </div>
      </Stack>
    </>
  );
}
