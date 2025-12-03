"use client";

import React from "react";
import {Form, Input, Select, SelectItem, Checkbox, Button} from "@heroui/react";

type Errors = Record<string, string | string[]>;

type RegisterFormProps = {
  onClose?: () => void;
};

export default function RegisterForm({onClose}: RegisterFormProps) {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState<Record<string, FormDataEntryValue> | null>(
    null,
  );
  const [errors, setErrors] = React.useState<Errors>({});

  const getPasswordError = (value: string): string | null => {
    if (value.length < 6) return "Пароль должен быть длиной не менее 6 символов";
    if ((value.match(/[A-ZА-Я]/g) || []).length < 1) {
      return "Пароль должен содержать хотя бы одну заглавную букву";
    }
    if ((value.match(/[0-9]/g) || []).length < 1) {
      return "Пароль должен содержать хотя бы одну цифру";
    }
    return null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors: Errors = {};

    const passwordError = getPasswordError(String(data.password ?? ""));
    if (passwordError) newErrors.password = passwordError;

    if (String(data.nickname ?? "").trim().toLowerCase() === "admin") {
      newErrors.nickname = "Этот ник занят. Выбери другой 🙂";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (data.rules !== "true") {
      setErrors({rules: "Нужно согласиться с правилами клуба"});
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
        setPassword("");
        setErrors({});
      }}
      onSubmit={onSubmit}
    >
      {/* Заголовок */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-slate-50">
          Регистрация
        </h1>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-snug">
          Создай профиль, чтобы быстрее бронировать ПК и консоли
        </p>
      </div>

      {/* Поля */}
      <div className="flex flex-col gap-3 mt-2">
        <Input
          isRequired
          name="nickname"
          type="text"
          aria-label="Никнейм"
          placeholder="Никнейм"
          variant="bordered"
          size="lg"
          radius="none"
          errorMessage={errors.nickname as string | undefined}
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
          name="email"
          type="email"
          aria-label="E-mail"
          placeholder="E-mail"
          variant="bordered"
          size="lg"
          radius="none"
          errorMessage={errors.email as string | undefined}
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
          name="phone"
          type="tel"
          aria-label="Телефон"
          placeholder="Телефон (необязательно)"
          variant="bordered"
          size="lg"
          radius="none"
          className="w-full"
          classNames={{
            label: "hidden",
            inputWrapper:
              "h-12 bg-[#151a25] border border-[#30384a] " +
              "hover:border-slate-500/80 transition-colors",
            input: "text-sm text-slate-50 placeholder:text-slate-500",
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
          value={password}
          errorMessage={
            (errors.password as string | undefined) ??
            getPasswordError(password) ??
            undefined
          }
          isInvalid={getPasswordError(password) !== null || !!errors.password}
          className="w-full"
          classNames={{
            label: "hidden",
            inputWrapper:
              "h-12 bg-[#151a25] border border-[#30384a] " +
              "hover:border-violet-400/70 " +
              "group-data-[focus=true]:border-violet-400/90 " +
              "transition-colors",
            input: "text-sm text-slate-50 placeholder:text-slate-400",
          }}
          onValueChange={(value) => {
            setPassword(value);
            setErrors((prev) => {
              const copy = {...prev};
              delete copy.password;
              return copy;
            });
          }}
        />

        <Select
          isRequired
          name="zone"
          aria-label="Предпочитаемая зона"
          placeholder="Выберите игровую зону"
          variant="bordered"
          radius="none"
          size="md"
          className="w-full"
          classNames={{
            trigger:
              "h-11 bg-[#151a25] border border-[#30384a] " +
              "hover:border-sky-400/70 data-[focus-visible=true]:border-sky-400/90",
            value: "text-sm text-slate-50",
            listbox: "bg-[#151a25] text-slate-50",
          }}
        >
          <SelectItem key="pc">ПК-зона</SelectItem>
          <SelectItem key="ps">PS5-зона</SelectItem>
          <SelectItem key="vip">VIP-комната</SelectItem>
        </Select>

        <div className="mt-1">
          <Checkbox
            isRequired
            name="rules"
            value="true"
            isInvalid={!!errors.rules}
            validationBehavior="aria"
            classNames={{
              wrapper:
                "border-slate-500 data-[selected=true]:border-emerald-400",
              label: "text-xs text-slate-300",
            }}
            onValueChange={() =>
              setErrors((prev) => {
                const copy = {...prev};
                delete copy.rules;
                return copy;
              })
            }
          >
            Я согласен(на) с правилами клуба и обработкой данных
          </Checkbox>

          {errors.rules && (
            <span className="mt-1 block text-[11px] text-danger">
              {errors.rules as string}
            </span>
          )}
        </div>
      </div>

      {/* Кнопка */}
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
          Зарегистрироваться
        </Button>
      </div>

      {/* Отладка */}
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
