import { createContext, FC, ReactNode, useContext, useState } from "react";

export const authErrorContext = createContext<{
  error: string | null;
  setError: Function;
}>({ error: null, setError: () => {} });

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <authErrorContext.Provider value={{ error, setError }}>
      {children}
    </authErrorContext.Provider>
  );
};

export const useAuthErrorContext = () => {
  return useContext(authErrorContext);
};
