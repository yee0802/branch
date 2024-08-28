import axios from "@/api/axios";
import { toast } from "sonner";
import { loginAPI, registerAPI } from "@/service/apiClient";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  token: string | null;
  user: UserProfile | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
};

type UserProfile = {
  id: string;
  username: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setToken(token);
      setUser(JSON.parse(user));

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      const { exp }: { exp: number } = jwtDecode(token);
      const expirationTime = exp * 1000;

      if (Date.now() >= expirationTime) {
        logout();
      }
    }

    setIsReady(true);
  }, [navigate]);

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
          const userObj: UserProfile = {
            id: res.data.user.id,
            username: res.data.user.username,
          };

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(userObj));

          setToken(res.data.token);
          setUser(res.data.user);

          toast.success("Login Successful!");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server error occured");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    axios.defaults.headers.common["Authorization"] = undefined;
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, user, token, logout, registerUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};
