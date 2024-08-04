import React, { useEffect } from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, SquarePen, TriangleAlert } from "lucide-react";

import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AlertElement from "@/components/AlertElement";

import { Button } from "@/components/ui/button";
import ButtonElement from "@/components/ButtonElement";

import useTitle from "../../hooks/useTitle";

const UsersList = () => {
  const navigate = useNavigate();
  useTitle("Пользователи");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("User", {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
  });

  const handleCreateUserClick = () => navigate("/dash/users/create");

  let table;

  if (isLoading) {
    table = (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="h-24 text-center">
            Загрузка данных...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (isSuccess) {
    if (users.length === 0) {
      table = (
        <TableBody>
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              Нет данных
            </TableCell>
          </TableRow>
        </TableBody>
      );
    } else {
      table = users.map((user) => {
        return (
          <TableBody key={user.id}>
            <TableRow>
              <TableCell className="px-4 py-3 space-x-1">
                <span className="inline-block">
                  {user.isActive ? "" : <TriangleAlert size={15} color="red" />}
                </span>
                <span className="inline-block">{user.userName}</span>
              </TableCell>
              <TableCell className="px-4 py-3">{user.role}</TableCell>
              <TableCell className="px-4 py-3 text-right">
                <Button
                  onClick={() => navigate(`/dash/users/${user.id}`)}
                  variant="neutral"
                >
                  <SquarePen size={17} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        );
      });
    }
  }

  return (
    <div className="p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <ButtonElement path="/dash" />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Пользователи
          </h4>
        </div>
        <Button onClick={handleCreateUserClick}>Создать</Button>
      </div>

      {isError ? (
        <AlertElement error={error} />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Имя пользователя</TableHead>
              <TableHead className="p-4">Роль</TableHead>
              <TableHead className="p-4"></TableHead>
            </TableRow>
          </TableHeader>
          {table}
        </Table>
      )}
    </div>
  );
};

export default UsersList;
