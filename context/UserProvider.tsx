import React, { createContext, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

type User = {
  user: Object;
  setUser: React.Dispatch<React.SetStateAction<Object>>;
};

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
