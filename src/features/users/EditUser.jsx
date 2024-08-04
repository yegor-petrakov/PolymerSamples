import React from "react";
import useTitle from "@/hooks/useTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery, useUpdateUserMutation } from "./usersApiSlice";

import { useNavigate } from "react-router-dom";

import Select from "@/components/ui/Select";

import AlertElement from "@/components/AlertElement";

import ButtonElement from "@/components/ButtonElement";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Checkbox } from "@/components/ui/checkbox";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ChevronLeft, ChevronsUpDown, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EditUser = () => {
  useTitle("Редактирование");

  const { id } = useParams();

  const navigate = useNavigate();

  const roleOptions = [
    { value: "", valueName: "Выберите значение" },
    { value: "viewer", valueName: "viewer" },
    { value: "editor", valueName: "editor" },
    { value: "admin", valueName: "admin" },
  ];

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserByIdQuery(id);

  const [
    updateUser,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateUserMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({
    value: "",
    valueName: "Выберите значение",
  });
  const [isActive, setIsActive] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleActiveChange = () => {
    setIsActive((prev) => !prev);
  };

  const handleUpdateUser = () =>
    updateUser({
      ...user,
      username,
      password,
      role: role.value,
      is_active: isActive,
    });

  let canSave = true;

  useEffect(() => {
    if (user) {
      setUsername(user.userName);

      const selectedRole = roleOptions.find((opt) => opt.value === user.role);

      setRole(selectedRole || { value: "", valueName: "Выберите значение" });
      setIsActive(user.isActive);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setUsername("");
      setPassword("");
      setRole("");
      setIsActive("");
      navigate("/dash/users");
    }
  }, [isUpdateSuccess]);
  const isDesktop = useMediaQuery({
    query: "(min-width: 924px)",
  });
  let content;

  if (isSuccess) {
    content = (
      <div className="p-3">
        <div className="flex justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/dash/users")}
              size="icon"
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Редактирование пользователя
            </h4>
          </div>
        </div>
        <Card>
          <CardContent className="py-4 pt-8 flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                onChange={handleUsernameChange}
                value={username}
                type="text"
                id="username"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                onChange={handlePasswordChange}
                type="password"
                id="password"
              />
            </div>

            <div className="w-full">
              <Label>Роль</Label>
              <Select
                state={role}
                setState={setRole}
                options={roleOptions}
                isDesktop={isDesktop}
              />
            </div>

            <div className="items-top flex space-x-2">
              <Checkbox
                id="active"
                onCheckedChange={handleActiveChange}
                checked={isActive}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Пользователь {isActive ? "активен" : "деактивирован"}
                </Label>
                <p className="text-sm text-slate-600">
                  Деактивированный пользователь не сможет авторизироваться и
                  использовать систему.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-4">
              {isError ? <AlertElement error={error} /> : ""}
              {/* <Button onClick={handleUpdateUser}>Подтвердить</Button> */}
              <ButtonElement
                variant="default"
                buttonText="Сохранить"
                isLoadingText="Сохранение..."
                handleClick={handleUpdateUser}
                isLoading={isUpdateLoading}
                isDisabled={!canSave}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return content;
};

export default EditUser;
