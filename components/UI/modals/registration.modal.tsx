"use client";

import CustomModal from "@/components/UI/common/modals";
import RegisterForm from "@/forms/registration.form";

export type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegistrationModal({isOpen, onClose}: RegistrationModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Регистрация игрока"
    >
      <RegisterForm onClose={onClose} />
    </CustomModal>
  );
}
