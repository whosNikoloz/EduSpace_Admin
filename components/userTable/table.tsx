"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { RenderCell } from "./render-cell";
import Authentication from "@/app/api/User/auth"; // Ensure this is exported correctly

// Define the response type from the API
interface ApiResponse<T> {
  success: boolean;
  result?: T;
}

const columns = [
  { name: "NAME", uid: "name" },
  { name: "FIRSTNAME", uid: "firstname" },
  { name: "LASTNAME", uid: "lastname" },
  { name: "PHONE", uid: "phone" },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];

// Adjust fetchUsers to use ApiResponse<UserModel[]>
const fetchUsers = async (
  getUsers: () => Promise<ApiResponse<UserModel[]>>
) => {
  try {
    const response = await getUsers();
    if (response.success && Array.isArray(response.result)) {
      return response.result;
    } else {
      console.error("Failed to fetch users:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export function TableWrapper() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const auth = Authentication();

  useEffect(() => {
    const fetchAndUpdateUsers = async () => {
      const usersList = await fetchUsers(
        auth.getUsers as () => Promise<ApiResponse<UserModel[]>>
      );
      setUsers(usersList);
    };
    fetchAndUpdateUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserDelete = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  const handleUserEdit = (updatedUser: UserModel) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
  };
  const filteredUsers = users.filter((user) => user.role !== "admin");

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filteredUsers}>
          {(item) => (
            <TableRow key={item.userId}>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {RenderCell({
                    user: item,
                    columnKey: column.uid,
                    onUserDelete: handleUserDelete,
                    onUserEdit: handleUserEdit,
                  })}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
