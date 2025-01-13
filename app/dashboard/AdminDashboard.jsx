"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
} from "@nextui-org/react";
import UploadPage from "../videos/upload/page";
export default function AdminDashboard({ user }) {
  const { loading, logout } = useSession();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {/* Upload video */}
      <UploadPage />
      <div className="flex gap-4 mt-4">
        {/*table  */}
        <h1 className="text-2xl font-bold">Users</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableColumn>Username</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={deleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
const deleteUser = async (userId) => {
  try {
    await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user._id !== userId));
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
