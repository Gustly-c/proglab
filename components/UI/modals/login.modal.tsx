"use client";

import CustomModal from "@/components/UI/common/modals";
import LoginForm from "@/forms/login.form";

export type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({isOpen, onClose}: LoginModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Вход в аккаунт"
    >
      <LoginForm onClose={onClose} />
    </CustomModal>
  );
}
