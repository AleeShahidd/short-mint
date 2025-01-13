"use client";
import { redirect } from "next/navigation";
import useSession from "@/hooks/useSession";
import { Button, Link, Skeleton } from "@nextui-org/react";
import UploadPage from "../videos/upload/page";
import { FaPlus } from "react-icons/fa";

export default function DashboardPage() {
  const { user, loading, logout } = useSession();

  if (loading) {
    return <Skeleton>Loading...</Skeleton>;
  }

  if (!user) {
    redirect("/");
  }

  const renderDashboard = () => {
    switch (user.role) {
      case "admin":
        return (
          <div className="flex flex-col items-center p-4 bg-white/20 rounded-lg shadow-md">
            <div className="text-xl font-bold text-center mb-2">
              Welcome, {user.name}!
            </div>
            <AdminDashboard user={user} />
          </div>
        );
      case "creator":
        return (
          <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-4">
              Welcome, {user.name}!
            </h1>
            <p className="text-center text-gray-200 mb-1">
              You can upload a video here
            </p>
            <Link href="/videos/upload">
              <Button startContent={<FaPlus />} color="secondary">
                Upload a video
              </Button>
            </Link>
          </div>
        );
      case "consumer":
        return (
          <div className="flex flex-col items-center p-4 bg-white/20 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-center mb-2">
              Welcome, {user.name}!
            </div>
            <div className="text-center">
              <p className="text-gray-200">Email: {user.email}</p>
              <p className="text-gray-200">Role: {user.role}</p>
              <Link href="/">
                <Button>Go back </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-center mx-auto font-bold">Dashboard</h1>
      </div>
      <div className="flex justify-center ">{renderDashboard()}</div>
    </div>
  );
}
