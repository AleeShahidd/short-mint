"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  Link,
  Skeleton,
} from "@nextui-org/react";
import useSession from "@/hooks/useSession"; // Adjust the path to your hook file

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function App() {
  const { user, loading, logout } = useSession();

  return (
    <Navbar>
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            <AcmeLogo />
            Shortsmint
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {loading ? (
          <NavbarItem>
            <Skeleton>Loading...</Skeleton>
          </NavbarItem>
        ) : user ? (
          <>
            <NavbarItem>
              <Link href="/dashboard">Dashboard</Link>
            </NavbarItem>
            <NavbarItem className="max-md:hidden">
              <span>Welcome, {user.name || "User"}!</span>
            </NavbarItem>
            <NavbarItem>
              <Button auto flat color="danger" onClick={logout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
