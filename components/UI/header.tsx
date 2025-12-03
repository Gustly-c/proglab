"use client";

import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import {usePathname} from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as UiLink,
  Button,
} from "@heroui/react";

import Modals from "@/components/UI/modals/modals";

// меню навигации
const navItems = [
  {name: "Смена", href: "/"},
  {name: "Игроки", href: "/players"},
  {name: "Тарифы", href: "/tariffs"},
  {name: "Касса", href: "/finance"},
];

export default function Header() {
  const pathname = usePathname();

  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <>
      <Navbar
        maxWidth="full"
        className="border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl"
        classNames={{
          wrapper: "max-w-6xl mx-auto w-full",
        }}
      >
        <NavbarBrand>
          <NextLink href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Club Logo"
              width={40}
              height={40}
              className="rounded-lg border border-white/20 shadow-md"
              priority
            />
            <span className="font-semibold text-base text-slate-50 tracking-tight">
              CyberFox Club
            </span>
          </NextLink>
        </NavbarBrand>

        {/* центральное меню */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <UiLink
                  as={NextLink}
                  href={item.href}
                  className={
                    "rounded-md h-9 px-4 flex items-center text-sm transition-colors " +
                    (isActive
                      ? "text-sky-300 font-semibold bg-slate-800/60 border border-slate-700"
                      : "text-slate-200/80 hover:text-sky-200")
                  }
                  underline="none"
                >
                  {item.name}
                </UiLink>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* правая часть */}
        <NavbarContent justify="end" className="gap-3">
          <NavbarItem>
            <Button
              size="sm"
              variant="light"
              className="h-9 px-4 text-sm text-slate-200 hover:text-sky-200"
              onClick={openLogin}
            >
              Login
            </Button>
          </NavbarItem>

          <NavbarItem className="hidden md:flex">
            <Button
              size="sm"
              variant="bordered"
              className="h-9 px-4 text-sm border-sky-500/60 text-sky-300 hover:bg-sky-500/10"
              onClick={openSignUp}
            >
              Sign Up
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button
              as={NextLink}
              href="/finance"
              className="
                h-9 px-4 text-xs md:text-sm font-semibold rounded-md
                bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500
                text-slate-950 shadow-lg shadow-sky-500/30
                border border-sky-400/60
              "
              variant="solid"
            >
              Открыть кассу
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* тут реально монтируются модалки */}
      <Modals
        isLoginOpen={isLoginOpen}
        isSignUpOpen={isSignUpOpen}
        onLoginClose={closeLogin}
        onSignUpClose={closeSignUp}
      />
    </>
  );
}
