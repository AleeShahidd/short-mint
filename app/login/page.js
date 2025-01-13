"use client";

import { Input, Button, Card, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const { user, loading, fetchSession } = useSession();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data) {
      document.cookie = `token=${data.token}`;
      router.push("/");
      document.location.reload();
    } else {
      alert("Invalid credentials");
    }
  };

  if (loading) {
    return <Skeleton count={3} height={250} className="w-64" />;
  }
  if (user) {
    router.push("/");
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-5">
      <Card className="max-sm:w-full w-64 p-5 gap-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <Input
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button color="secondary" className="mt-4" onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
