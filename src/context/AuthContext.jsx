import { loginApi, logoutApi, registerApi } from "../api/auth";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const registerUser = async (name, email, password, password_confirmation) => {
    try {
      const registerData = await registerApi(
        name,
        email,
        password,
        password_confirmation,
      );
      const { user, token } = registerData.data.result;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
       return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.email?.[0] || "Something went wrong";
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      const LoginData = await loginApi(email, password);
      const { user, token } = LoginData.data.result;

      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.result?.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await logoutApi(token);
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, token, user, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};
