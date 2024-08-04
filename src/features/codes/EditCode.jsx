import React, { useEffect, useState } from "react";
import {
  useGetCodeByIdQuery,
  useUpdateCodeMutation,
  useDeleteCodeMutation,
} from "./codesApiSlice";

import { useNavigate, useParams } from "react-router-dom";

import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import ButtonElement from "@/components/ButtonElement";

import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Label } from "../../components/ui/label";

import Select from "@/components/ui/Select";

import { useMediaQuery } from "react-responsive";
import useTitle from "../../hooks/useTitle";

const EditCode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let typeOptions = [
    { value: "", valueName: "Выберите значение" },
    { value: 1, valueName: "Лента" },
    { value: 2, valueName: "Ziplink" },
    { value: 3, valueName: "Плоский ремень" },
    { value: 4, valueName: "Зубчатый ремень" },
    { value: 5, valueName: "Покрытие" },
    { value: 6, valueName: "Другое" },
  ];

  let stockLevelOptions = [
    { value: "", valueName: "Выберите значение" },
    { value: "empty", valueName: "Пусто" },
    { value: "low", valueName: "Заканчивается" },
    { value: "enough", valueName: "Достаточно" },
  ];

  useTitle("Редактирование");

  const {
    data: code,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCodeByIdQuery(id);

  const [
    updateCode,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateCodeMutation();

  const [
    deleteCode,
    {
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteCodeMutation();

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

  const canSave =
    [isValidShortCodeName, isValidCodeName].every(Boolean) &&
    stockLevel.value !== "" &&
    type.value !== "" &&
    !isLoading;

  useEffect(() => {
    setIsValidShortCodeName(shortCodeName.trim().length > 0);
    setIsValidCodeName(codeName.trim().length > 0);
  }, [shortCodeName, codeName]);

  useEffect(() => {
    if (code) {
      setShortCodeName(code.short_code_name);
      setCodeName(code.code_name);
      setSupplierCodeName(code.supplier_code_name);

      const selectedStockLevel = stockLevelOptions.find(
        (opt) => opt.value === code.stock_level
      );

      setStockLevel(
        selectedStockLevel || { value: "", valueName: "Выберите значение" }
      );

      const selectedType = typeOptions.find(
        (opt) => opt.value === code.type_id
      );
      setType(selectedType || { value: "", valueName: "Выберите значение" });

      setNote(code.note);
    }
  }, [isSuccess]);

  const handleUpdateCode = () =>
    updateCode({
      ...code,
      id,
      short_code_name: shortCodeName.trim(),
      code_name: codeName.trim(),
      supplier_code_name: supplierCodeName.trim(),
      stock_level: stockLevel.value,
      type_id: type.value,
      note,
    });

  const handleDeleteCode = () =>
    deleteCode({
      id,
    });

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      setShortCodeName("");
      setCodeName("");
      setSupplierCodeName("");
      setStockLevel({ value: "", valueName: "Выберите значение" });
      setType({ value: "", valueName: "Выберите значение" });
      setNote("");
      navigate("/dash/codes");
    }
  }, [isUpdateSuccess, isDeleteSuccess]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 924px)",
  });
  return (
    <div className="p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <ButtonElement path={-1} />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Редактирование маркировки
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
                options={stockLevelOptions}
                isDesktop={isDesktop}
              />
            </div>
            <div className="w-full">
              <Label>Тип</Label>
              <Select
                state={type}
                setState={setType}
                options={typeOptions}
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
          <div className="mt-2 flex gap-1">
            <ButtonElement
              variant="default"
              buttonText="Сохранить"
              isLoadingText="Сохранение..."
              handleClick={handleUpdateCode}
              isLoading={isLoading}
              isDisabled={!canSave}
            />
            <ButtonElement
              variant="destructive"
              buttonText="Удалить"
              isLoadingText="Удаление..."
              handleClick={handleDeleteCode}
              isLoading={isLoading}
              isDisabled={!canSave}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditCode;
