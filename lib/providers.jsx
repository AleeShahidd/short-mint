// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }) {
  const router = useRouter();
  const useHref = (href) => process.env.AUTH_URL + href;

  return (
    <NextUIProvider navigate={router.push} useHref={useHref}>
      {children}
    </NextUIProvider>
  );
}
