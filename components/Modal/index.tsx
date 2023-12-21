import {
  Modal as ModalUI,
  ModalContent,
  ModalBackdrop,
  ModalFooter as ModalFooterUI,
  ModalHeader as ModalHeaderUI,
  ModalBody as ModalBodyUI,
  ModalCloseButton as ModalCloseButtonUI,
} from "@gluestack-ui/themed";
import React, { createContext, useContext, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

type ModalType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
};

export const ModalProvider = ({ children }: Props) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ModalComponent = ({ children }: Props) => {
  const { showModal } = useModal();

  return (
    <ModalProvider>
      <ModalUI isOpen={showModal}>
        <ModalBackdrop />
        <ModalContent>{children}</ModalContent>
      </ModalUI>
    </ModalProvider>
  );
};

export const ModalHeader = ({ children }: Props) => {
  return <ModalHeaderUI>{children}</ModalHeaderUI>;
};

export const ModalBody = ({ children }: Props) => {
  return <ModalBodyUI>{children}</ModalBodyUI>;
};

export const ModalFooter = ({ children }: Props) => {
  return <ModalFooterUI>{children}</ModalFooterUI>;
};

export const ModalCloseButton = ({ children }: Props) => {
  return <ModalCloseButtonUI>{children}</ModalCloseButtonUI>;
};

export const Modal = {
  Modal: ModalComponent,
  ModalProvider,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
};
