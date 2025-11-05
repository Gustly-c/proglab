"use client";

import Image from "next/image";
import NextLink from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as UiLink,
  Button,
} from "@heroui/react";

// Массив навигации (этап 23)
const navItems = [
  { name: "Features", href: "/features" },
  { name: "Customers", href: "/customers" },
  { name: "Integrations", href: "/integrations" },
];

export default function Header() {
  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-purple-600 to-indigo-700 border-b border-white/20"
    >
      <NavbarBrand>
        <NextLink href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="My Logo"
            width={48}
            height={48}
            className="rounded-lg border border-white/30"
            priority
          />
          <span className="font-bold text-white">FormaFlow</span>
        </NextLink>
      </NavbarBrand>

      {/* Рендер меню через .map() по navItems */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <UiLink as={NextLink} href={item.href} className="text-white opacity-90 hover:opacity-100">
              {item.name}
            </UiLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <UiLink as={NextLink} href="/login" className="text-white">
            Login
          </UiLink>
        </NavbarItem>
        <NavbarItem>
          <Button as={NextLink} href="/signup" color="secondary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
