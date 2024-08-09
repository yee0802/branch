import axios from "@/api/axios";
import { toast } from "sonner";
import { loginAPI, registerAPI } from "@/service/apiClient";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

type UserProfile = {
  username: string;
  email: string;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    if (!token) {
      navigate("/login", { state: null });
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    password: string,
    email: string,
  ) => {
    await registerAPI(username, password, email)
      .then((res) => {
        if (res) {
          toast.success("Registration Successful!");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error occured");
      });
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          setToken(res.data.token);

          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));

          toast.success("Login Successful!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error occured");
      });
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
