import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import AlertElement from "@/components/AlertElement";

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import ButtonElement from "@/components/ButtonElement";

import { useAddNewUserMutation } from "./usersApiSlice";

import useTitle from "../../hooks/useTitle";

const CreateUser = () => {
  const navigate = useNavigate();
  useTitle("Создание");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/users");
    }
  }, [isSuccess]);

  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [role, setRole] = useState("");
  const handleRoleChange = (e) => setRole(e.target.value);

  const [isActive, setIsActive] = useState(true);
  const handleActiveChange = (e) => {
    setIsActive((prev) => !prev);
    // // console.log(e)
  };

  const handleAddNewUser = () => {
    // console.log(username, password, role, isActive)
    addNewUser({ username, password, role, isActive });
  };

  let canSave = username.length > 1 && password.length > 5;

  return (
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
            Создание пользователя
          </h4>
        </div>
      </div>
      <Card>
        <CardContent className="py-4 pt-8 flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input onChange={handleUsernameChange} type="text" id="username" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Пароль</Label>
            <Input
              onChange={handlePasswordChange}
              type="password"
              id="password"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Роль</Label>
            <select
              name="leftovers"
              className="flex w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 z-50"
              onChange={handleRoleChange}
              value={role}
            >
              <option value="viewer">viewer</option>
              <option value="editor">editor</option>
              <option value="admin">admin</option>
            </select>
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
            <ButtonElement
              variant="default"
              buttonText="Сохранить"
              isLoadingText="Сохранение..."
              handleClick={handleAddNewUser}
              isLoading={isLoading}
              isDisabled={!canSave}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateUser;
