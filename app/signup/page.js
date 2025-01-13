"use client";

import useSession from "@/hooks/useSession";
import {
  Input,
  Button,
  Select,
  Card,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const { user, loading, fetchSession } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  console.log(form);

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res?.json();

    if (data.success) {
      alert("Signup successful! Now Login");
      router.push("/login");
      setForm({ name: "", email: "", password: "", role: "" });
    } else {
      alert("Error during signup", data.error);
    }
  };

  if (loading) {
    return <Skeleton count={3} height={50} className="w-64" />;
  }
  if (user) {
    router.push("/");
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-5">
      <Card className="max-sm:w-full w-64 p-5 gap-4">
        <h1 className="text-3xl font-bold">Signup</h1>
        <Input
          label="Name"
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <Select
          label="Role"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <SelectItem
            key="consumer"
            value="consumer"
            onClick={(e) => setForm({ ...form, role: "consumer" })}
          >
            Consumer
          </SelectItem>
          <SelectItem
            key="creator"
            value="creator"
            onClick={(e) => setForm({ ...form, role: "creator" })}
          >
            Creator
          </SelectItem>
        </Select>
        <Button className="mt-4" color="secondary" onClick={handleSignup}>
          Signup
        </Button>
      </Card>
    </div>
  );
}
