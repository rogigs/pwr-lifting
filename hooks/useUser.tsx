import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
};
