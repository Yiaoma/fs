import { createContext, useState } from "react";

interface AuthContextProps {
  accessToken: String | null;
  login: (accessToken: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  login: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<String | null>(null);

  const login = (accessToken: string) => setAccessToken(accessToken);

  return (
    <AuthContext.Provider value={{ accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
