"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AppNavbar() {
  const router = useRouter();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" color="primary">
          VideoApp
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/signup">Signup</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/videos/upload">Upload</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
