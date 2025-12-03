"use client";

import LoginModal from "./login.modal";
import RegistrationModal from "./registration.modal";

export type ModalsProps = {
  isLoginOpen: boolean;
  isSignUpOpen: boolean;
  onLoginClose: () => void;
  onSignUpClose: () => void;
};

export default function Modals({
  isLoginOpen,
  isSignUpOpen,
  onLoginClose,
  onSignUpClose,
}: ModalsProps) {
  return (
    <>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <RegistrationModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </>
  );
}
