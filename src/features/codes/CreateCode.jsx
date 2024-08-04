import React, { useEffect, useState } from "react";
import { useAddNewCodeMutation } from "./codesApiSlice";

import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import ButtonElement from "@/components/ButtonElement";
import AlertElement from "@/components/AlertElement";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Select from "@/components/ui/Select";

import useTitle from "../../hooks/useTitle";

const CreateCode = () => {
  const navigate = useNavigate();

  useTitle("Создание");

  const [addNewCode, { isLoading, isSuccess, isError, error }] =
    useAddNewCodeMutation();

  const [shortCodeName, setShortCodeName] = useState("");
  const handleShortCodeNameChange = (e) => setShortCodeName(e.target.value);
  const [isValidShortCodeName, setIsValidShortCodeName] = useState(false);

  const [codeName, setCodeName] = useState("");
  const handleCodeNameChange = (e) => setCodeName(e.target.value);
  const [isValidCodeName, setIsValidCodeName] = useState(false);

  const [supplierCodeName, setSupplierCodeName] = useState("");
  const handleSupplierCodeNameChange = (e) =>
    setSupplierCodeName(e.target.value);

  const [stockLevel, setStockLevel] = useState({
    value: "",
    valueName: "Выберите значение",
  });

  const [type, setType] = useState({
    value: "",
    valueName: "Выберите значение",
  });

  const [note, setNote] = useState("");
  const handleNoteChange = (e) => setNote(e.target.value);

  useEffect(() => {
    setIsValidShortCodeName(shortCodeName.trim().length > 0);
    setIsValidCodeName(codeName.trim().length > 0);
  }, [shortCodeName, codeName]);

  const canSave =
    [isValidShortCodeName, isValidCodeName].every(Boolean) &&
    stockLevel.value.length !== 0 &&
    type.value.length !== 0 &&
    !isLoading;

  const handleCreateNewCode = () =>
    addNewCode({
      short_code_name: shortCodeName.trim(),
      code_name: codeName.trim(),
      supplier_code_name: supplierCodeName.trim(),
      stock_level: stockLevel.value,
      type_id: type.value,
      note,
    });

  useEffect(() => {
    if (isSuccess) {
      setShortCodeName("");
      setCodeName("");
      setSupplierCodeName("");
      setStockLevel({
        value: "",
        valueName: "Выберите значение",
      });
      setNote("");
      setType("");
      navigate("/dash/codes");
    }
  }, [isSuccess, navigate]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 924px)",
  });

  return (
    <div className="p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <ButtonElement path="/dash/codes" />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Создание маркировки
          </h4>
        </div>
      </div>
      <Card>
        <CardContent className="py-4 pt-8 flex flex-col gap-4">
          <InputField
            labelText="Сокращение"
            name="short_code_name"
            value={shortCodeName}
            handleChange={handleShortCodeNameChange}
            isDisabled={isLoading}
          />
          <InputField
            labelText="Маркировка"
            name="code_name"
            value={codeName}
            handleChange={handleCodeNameChange}
            isDisabled={isLoading}
          />
          <InputField
            labelText="Код поставщика"
            name="supplier_code_name"
            value={supplierCodeName}
            handleChange={handleSupplierCodeNameChange}
            isDisabled={isLoading}
          />

          <div className="flex flex-col gap-2">
            <div className="w-full">
              <Label>Количество</Label>
              <Select
                state={stockLevel}
                setState={setStockLevel}
                options={[
                  { value: "", valueName: "Выберите значение" },
                  { value: "empty", valueName: "Пусто" },
                  { value: "low", valueName: "Заканчивается" },
                  { value: "enough", valueName: "Достаточно" },
                ]}
                isDesktop={isDesktop}
              />
            </div>
            <div className="w-full">
              <Label>Тип</Label>
              <Select
                state={type}
                setState={setType}
                options={[
                  { value: "", valueName: "Выберите значение" },
                  { value: 1, valueName: "Лента" },
                  { value: 2, valueName: "Ziplink" },
                  { value: 3, valueName: "Плоский ремень" },
                  { value: 4, valueName: "Зубчатый ремень" },
                  { value: 5, valueName: "Покрытие" },
                  { value: 6, valueName: "Другое" },
                ]}
                isDesktop={isDesktop}
              />
            </div>
          </div>

          <TextareaField
            labelText="Примечание"
            name="note"
            value={note}
            handleChange={handleNoteChange}
            isDisabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-4">
            {isError ? <AlertElement error={error} /> : ""}

            <ButtonElement
              variant="default"
              buttonText="Создать"
              isLoadingText="Создание..."
              handleClick={handleCreateNewCode}
              isLoading={isLoading}
              isDisabled={!canSave}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCode;
