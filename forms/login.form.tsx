"use client";

import React from "react";
import {Form, Input, Checkbox, Button} from "@heroui/react";

type Errors = Record<string, string | string[]>;

type LoginFormProps = {
  onClose?: () => void;
};

export default function LoginForm({onClose}: LoginFormProps) {
  const [submitted, setSubmitted] = React.useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  const [errors, setErrors] = React.useState<Errors>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors: Errors = {};
    const login = String(data.login ?? "").trim();
    const password = String(data.password ?? "");

    if (!login) {
      newErrors.login = "Введите логин или e-mail";
    }
    if (!password) {
      newErrors.password = "Введите пароль";
    } else if (password.length < 4) {
      newErrors.password = "Пароль должен быть не короче 4 символов";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
    onClose?.();
  };

  return (
    <Form
      className="w-full max-w-sm mx-auto flex flex-col gap-6"
      validationErrors={errors as any}
      onReset={() => {
        setSubmitted(null);
        setErrors({});
      }}
      onSubmit={onSubmit}
    >
      {/* Заголовок */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-slate-50">
          Вход в аккаунт
        </h1>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-snug">
          Авторизуйся, чтобы управлять бронированиями и профилем
        </p>
      </div>

      {/* Поля */}
      <div className="flex flex-col gap-3 mt-2">
        <Input
          isRequired
          name="login"
          type="text"
          aria-label="Логин или e-mail"
          placeholder="Логин или e-mail"
          variant="bordered"
          size="lg"
          radius="none"
          errorMessage={errors.login as string | undefined}
          className="w-full"
          classNames={{
            label: "hidden",
            inputWrapper:
              "h-12 bg-[#151a25] border border-[#30384a] " +
              "hover:border-sky-400/70 " +
              "group-data-[focus=true]:border-sky-400/90 " +
              "transition-colors",
            input: "text-sm text-slate-50 placeholder:text-slate-400",
          }}
        />

        <Input
          isRequired
          name="password"
          type="password"
          aria-label="Пароль"
          placeholder="Пароль"
          variant="bordered"
          size="lg"
          radius="none"
          errorMessage={errors.password as string | undefined}
          className="w-full"
          classNames={{
            label: "hidden",
            inputWrapper:
              "h-12 bg-[#151a25] border border-[#30384a] " +
              "hover:border-sky-400/70 " +
              "group-data-[focus=true]:border-sky-400/90 " +
              "transition-colors",
            input: "text-sm text-slate-50 placeholder:text-slate-400",
          }}
        />
      </div>

      {/* Чекбокс */}
      <div className="flex items-center gap-2 mt-1">
        <Checkbox
          name="remember"
          value="true"
          classNames={{
            wrapper: "border-slate-500 data-[selected=true]:border-sky-400",
            label: "text-xs text-slate-300",
          }}
        >
          Запомнить меня
        </Checkbox>
      </div>

      {/* Кнопка Войти */}
      <div className="mt-2">
        <Button
          type="submit"
          variant="solid"
          className="
            w-full h-11 text-sm font-semibold
            rounded-full
            bg-gradient-to-r from-[#007cf0] to-[#00dfd8]
            text-white
            shadow-[0_18px_45px_rgba(0,124,240,0.4)]
            hover:brightness-110 active:scale-[0.99]
            transition-transform transition-[filter]
          "
        >
          Войти
        </Button>
      </div>

      {/* Забыли пароль */}
      <button
        type="button"
        className="mt-3 text-xs text-slate-300 hover:text-sky-300 transition-colors text-center"
      >
        Забыли пароль?
      </button>

      {/* Отладка — убери перед сдачей, если не нужно */}
      {submitted && (
        <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <p className="text-xs text-slate-400 mb-1">
            Данные формы (для отладки):
          </p>
          <pre className="text-[11px] text-slate-300 overflow-x-auto">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </Form>
  );
}
