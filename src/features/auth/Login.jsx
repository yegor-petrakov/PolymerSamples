import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";

import AlertElement from "@/components/AlertElement";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide";

const Login = () => {
  useTitle("Авторизация");

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleToggle = () => {
    setPersist((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({
        login: username,
        password,
      }).unwrap();

      // console.log(accessToken)

      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err);
      }
      // errRef.current.focus();
    }
  };

  // const content = (
  //   <div>
  //     <Card className="w-[350px]">
  //       <CardHeader>
  //         <CardTitle>Авторизация</CardTitle>
  //         <CardDescription>Вход в систему управления образцами</CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <form onSubmit={handleSubmit}>
  //           <div className="grid w-full items-center gap-4">
  //             <div className="flex flex-col space-y-1.5">
  //               <Label htmlFor="username">Имя пользователя</Label>
  //               <Input
  //                 id="username"
  //                 type="text"
  //                 onChange={handleUsernameInput}
  //                 ref={userRef}
  //                 disabled={isLoading ? true : false}
  //                 autoComplete="off"
  //                 required
  //               />
  //             </div>

  //             <div className="flex flex-col space-y-1.5">
  //               <Label htmlFor="password">Пароль</Label>
  //               <Input
  //                 id="password"
  //                 type="password"
  //                 onChange={handlePasswordInput}
  //                 disabled={isLoading ? true : false}
  //                 autoComplete="off"
  //                 required
  //               />
  //             </div>

  //             <div className="items-top flex space-x-2">
  //               <Checkbox
  //                 id="persist"
  //                 onCheckedChange={handleToggle}
  //                 checked={persist}
  //                 disabled={isLoading ? true : false}
  //               />
  //               <div className="grid gap-1.5 leading-none">
  //                 <label
  //                   htmlFor="persist"
  //                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  //                 >
  //                   Оставаться авторизованым
  //                 </label>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="mt-6">
  //             {isLoading ? (
  //               <Button disabled>Обработка...</Button>
  //             ) : (
  //               <Button>Войти</Button>
  //             )}
  //           </div>
  //         </form>
  //       </CardContent>
  //     </Card>
  //     {errMsg ? (
  //       <div className="mt-3">
  //         <AlertElement error={errMsg} />
  //       </div>
  //     ) : (
  //       ""
  //     )}
  //   </div>
  // );

  let content = (
    // <form onSubmit={handleSubmit}>
    //   <div className="w-full">
    //     <div className="flex flex-col space-y-1.5">
    //       <Label htmlFor="username">Имя пользователя</Label>
    //       <Input
    //         id="username"
    //         type="text"
    //         onChange={handleUsernameInput}
    //         ref={userRef}
    //         disabled={isLoading ? true : false}
    //         required
    //       />
    //     </div>

    // <div className="flex flex-col space-y-1.5">
    //   <Label htmlFor="password">Пароль</Label>
    //   <Input
    //     id="password"
    //     type="password"
    //     onChange={handlePasswordInput}
    //     disabled={isLoading ? true : false}
    //     required
    //   />
    // </div>

    //   <div className="items-top flex space-x-2">
    //     <Checkbox
    //       id="persist"
    //       onCheckedChange={handleToggle}
    //       checked={persist}
    //       disabled={isLoading ? true : false}
    //     />
    //     <div className="grid gap-1.5 leading-none">
    //       <label
    //         htmlFor="persist"
    //         className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //       >
    //         Оставаться авторизованым
    //       </label>
    //     </div>
    //   </div>
    // </div>
    // <div className="mt-6">
    //   {isLoading ? (
    //     <Button disabled>Обработка...</Button>
    //   ) : (
    //     <Button>Войти</Button>
    //   )}
    // </div>
    // </form>
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="username">Имя пользователя</Label>
        <Input
          id="username"
          type="text"
          onChange={handleUsernameInput}
          ref={userRef}
          disabled={isLoading ? true : false}
          required
          className="bg-white"
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          onChange={handlePasswordInput}
          disabled={isLoading ? true : false}
          required
          className="bg-white"
        />
      </div>

      <div className="items-top flex space-x-2">
        <Checkbox
          id="persist"
          onCheckedChange={handleToggle}
          checked={persist}
          disabled={isLoading ? true : false}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="persist"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Оставаться авторизованым
          </label>
        </div>
      </div>

      <div className="mt-3 w-full">
        {isLoading ? (
          <Button className="w-full" disabled>
            Обработка...
          </Button>
        ) : (
          <Button className="w-full">Войти</Button>
        )}
      </div>
    </form>
  );

  return (
    <div className="p-3 h-screen w-full bg-slate-100 dark:bg-slate-800 items-center flex flex-col pt-16">
      <div className="mb-10">
        <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Авторизация
        </h2>
        <h4 className="scroll-m-20 text-lg font-medium tracking-tight">
          Система управления образцами
        </h4>
      </div>
      <div className="block w-full max-w-lg">{content}</div>
      {errMsg ? (
        <div className="block w-full max-w-lg mt-6">
          <AlertElement error={errMsg} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Login;
