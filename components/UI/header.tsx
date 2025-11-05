"use client";

import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";

export default function App() {
  return (
    <Navbar
      maxWidth="full"
      className="bg-gradient-to-r from-purple-600 to-indigo-700 border-b border-white/20"
    >
      <NavbarBrand>
        <Image
          src="/logo.png"      
          alt="My Logo"
          width={85}
          height={85}
          className="rounded-lg border border-white/30"
        />

        <p className="font-bold text-white ml-2">
          FormaFlow
        </p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#" className="text-white font-semibold">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="text-white">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-white">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
