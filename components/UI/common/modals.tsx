"use client";

import React, {ReactNode} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export type CustomModalProps = {
  /** Открыта ли модалка */
  isOpen: boolean;
  /** Что делать при закрытии (крестик, фон, кнопка) */
  onClose: () => void;

  /** Заголовок модального окна */
  title?: string;

  /** Основное содержимое */
  children: ReactNode;

  /** Показать/спрятать футер с кнопками */
  showFooter?: boolean;

  /** Текст основной кнопки (по умолчанию "Ок") */
  primaryLabel?: string;
  /** Обработчик клика по основной кнопке */
  onPrimary?: () => void;

  /** Текст кнопки "Отмена" (если не нужен – не передавать) */
  secondaryLabel?: string;
  /** Обработчик клика по кнопке "Отмена" */
  onSecondary?: () => void;

  /** Размер модалки, как в HeroUI */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
};

/**
 * Базовый компонент модального окна.
 * Используется в модалках LogIn / SignUp и любых других.
 */
export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  showFooter = false,
  primaryLabel = "Ок",
  onPrimary,
  secondaryLabel,
  onSecondary,
  size = "sm",
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      size={size}
      backdrop="blur"
      placement="center"
      // HeroUI отдаёт флаг isOpen сюда, поэтому через него закрываем
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent
        className="
          bg-slate-950/95
          border border-slate-800
          rounded-2xl
          text-slate-50
          shadow-2xl shadow-black/70
        "
      >
        <>
          {title && (
            <ModalHeader className="px-6 py-4 border-b border-slate-800">
              <h3 className="text-base md:text-lg font-semibold tracking-tight">
                {title}
              </h3>
            </ModalHeader>
          )}

          <ModalBody className="px-6 py-5">
            {children}
          </ModalBody>

          {showFooter && (
            <ModalFooter className="px-6 py-4 border-t border-slate-800 gap-3">
              {secondaryLabel && (
                <Button
                  variant="bordered"
                  className="border-slate-600 text-slate-200 hover:bg-slate-800/80"
                  onPress={() => {
                    onSecondary?.();
                    onClose();
                  }}
                >
                  {secondaryLabel}
                </Button>
              )}

              <Button
                className="
                  bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
                  text-slate-950 font-semibold
                  shadow-[0_0_20px_rgba(56,189,248,0.45)]
                  border border-sky-400/70
                  hover:brightness-110 active:scale-[0.99]
                "
                onPress={() => {
                  onPrimary?.();
                }}
              >
                {primaryLabel}
              </Button>
            </ModalFooter>
          )}
        </>
      </ModalContent>
    </Modal>
  );
}
