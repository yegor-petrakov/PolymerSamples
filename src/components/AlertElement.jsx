import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { CircleAlert } from "lucide-react";

const AlertElement = ({ error }) => {
  return (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Ошибка {error.status}</AlertTitle>
      <AlertDescription>
        {error.data ? error.data : "Ошибка на стороне сервера"}
      </AlertDescription>
    </Alert>
  );
};

export default AlertElement;
