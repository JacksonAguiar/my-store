import React, { createContext, useCallback, useContext, useState } from "react";
// import authAPI from "../services/Api/auth";
import { jwtDecode } from "jwt-decode";
import UserService from "services/UsersService";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  getToken():Promise<string | null>;
  verifyToken(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const service = new UserService(process.env.REACT_APP_BACKEND_URL!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@app:token");
    const user = localStorage.getItem("@app:user");
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: any) => {
    const response = await service.signIn(email, password);

    const { token, user } = response;

    localStorage.setItem("@app:token", token);
    localStorage.setItem("@app:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem("@app:token");
    localStorage.removeItem("@app:user");

    setData({} as AuthState);
  }, []);
  const getToken = useCallback(async () => {
    return localStorage.getItem("@app:token");
  }, []);

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("@app:token");
    const dateNow = Math.floor(Date.now() / 1000);
    var decodedToken: any;

    if (token) {
      decodedToken = jwtDecode(token);
      if (decodedToken.exp < dateNow) signOut();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, verifyToken, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
