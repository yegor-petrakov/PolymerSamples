import React from "react";
import useTitle from "@/hooks/useTitle";
import useAuth from "../../hooks/useAuth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { CornerDownRight } from "lucide-react";

const Home = () => {
  useTitle("Система управления образцами");
  const { userName } = useAuth();

  const currentDate = new Date().toLocaleString("ru-RU");

  return (
    <div className="p-3">
      <Card className="mt-6">
        <CardHeader>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Система управления образцами
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">{currentDate}</p>
        </CardHeader>
        <CardContent>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Добро пожаловать, {userName}
          </h4>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Home;
