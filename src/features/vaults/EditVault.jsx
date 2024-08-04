import { useState, useEffect } from "react";
import {
  useGetVaultByIdQuery,
  useUpdateVaultMutation,
  useDeleteVaultMutation,
} from "./vaultsApiSlice";
import { useGetCodesQuery } from "../codes/codesApiSlice";
import {
  useAddNewCodeVaultMutation,
  useDeleteCodeVaultMutation,
} from "./codeVaultApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Button } from "@/components/ui/button";

import { ChevronLeft, ChevronsUpDown, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Select from "@/components/ui/Select";

import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import TextareaField from "@/components/TextareaField";
import ButtonElement from "@/components/ButtonElement";

import useTitle from "../../hooks/useTitle";

const EditVault = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useTitle("Редактирование");

  const isDesktop = useMediaQuery({
    query: "(min-width: 950px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 950px)",
  });

  const {
    data: vault,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVaultByIdQuery(id);

  const {
    data: codes,
    isLoading: isCodesLoading,
    isSuccess: isCodesSuccess,
    isError: isCodesError,
    error: codesError,
  } = useGetCodesQuery();

  const [
    updateVault,
    {
      isLoading: isUpdateVaultLoading,
      isSuccess: isUpdateVaultSuccess,
      isError: isUpdateVaultError,
      error: updateVaultError,
    },
  ] = useUpdateVaultMutation();

  const [
    deleteVault,
    {
      isLoading: isDeleteVaultLoading,
      isSuccess: isDeleteVaultSuccess,
      isError: isDeleteVaultError,
      error: deleteVaultError,
    },
  ] = useDeleteVaultMutation();

  const [
    addNewCodeVault,
    {
      isLoading: isAddNewCodeVaultLoading,
      isSuccess: isAddNewCodeVaultSuccess,
      isError: isAddNewCodeVaultError,
      error: addNewCodeVaultError,
    },
  ] = useAddNewCodeVaultMutation();

  const [
    deleteCodeVault,
    {
      isLoading: isDeleteCodeVaultLoading,
      isSuccess: isDeleteCodeVaultSuccess,
      isError: isDeleteCodeVaultError,
      error: deleteCodeVaultError,
    },
  ] = useDeleteCodeVaultMutation();

  const [vaultName, setVaultName] = useState("");
  const [note, setNote] = useState("");
  const [leftover, setLeftover] = useState([
    {
      value: "",
      valueName: "Выберите значение",
    },
  ]);

  let canSave = vaultName.length > 0 && !isLoading;

  useEffect(() => {
    if (vault) {
      setVaultName(vault.vault_name);
      setNote(vault.note);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateVaultSuccess) {
      setVaultName("");
      setNote("");
      navigate("/dash/vaults");
    }
  }, [isUpdateVaultSuccess]);

  useEffect(() => {
    if (isDeleteVaultSuccess) {
      navigate("/dash/vaults");
    }
  }, [isDeleteVaultSuccess]);

  const onVaultNameChange = (e) => setVaultName(e.target.value);
  const onNoteChange = (e) => setNote(e.target.value);
  const onLeftoverChange = (e) => {
    setLeftover(e.target.value);
  };

  const handleUpdateVault = () =>
    updateVault({ ...vault[0], id, vault_name: vaultName, note });
  const handleDeleteVault = () => deleteVault({ id });
  const handleAddNewCodeVault = () =>
    addNewCodeVault({ vault_id: id, code_id: leftover.value });

  const [search, setSearch] = useState("");

  return (
    <div className="p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <ButtonElement variant="outline" path="/dash/vaults" />
          <Heading level={1} headingText="Редактирование ячейки" />
        </div>
      </div>
      <div className={`flex gap-4 ${isMobile ? "flex-col" : ""}`}>
        <Card className={isDesktop ? `w-1/2` : `w-full max-h-fit`}>
          <CardContent className="py-4 pt-8 flex flex-col gap-4">
            <InputField
              labelText="Название"
              name="vault_name"
              handleChange={onVaultNameChange}
              value={vaultName}
              isDisabled={isLoading}
            />

            <TextareaField
              labelText="Примечание"
              name="note"
              handleChange={onNoteChange}
              value={note}
              isDisabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <div className="mt-2 flex gap-1">
              <ButtonElement
                variant="default"
                buttonText="Сохранить"
                isLoadingText="Сохранение..."
                handleClick={handleUpdateVault}
                isLoading={isUpdateVaultLoading}
                isDisabled={!canSave}
              />
              <ButtonElement
                variant="destructive"
                buttonText="Удалить"
                isLoadingText="Удаление..."
                handleClick={handleDeleteVault}
                isLoading={isDeleteVaultLoading}
              />
            </div>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardContent className="py-4 pt-8 flex flex-col gap-4">
            <Label className="mb-[-10px]" htmlFor="leftovers">
              Остатки
            </Label>

            {/* <div className="flex gap-2">
              <select
                name="leftovers"
                className="flex w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-700 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 z-50"
                onChange={onLeftoverChange}
                value={leftover}
              >
                {codes
                  ? Object.values(codes).map((code) => (
                      <option key={code.id} value={code.id}>
                        [{code.short_code_name}] {code.code_name}
                      </option>
                    ))
                  : "1"}
              </select>

              <ButtonElement
                buttonText="Добавить"
                isLoadingText="Добавление..."
                isLoading={isAddNewCodeVaultLoading}
                isDisabled={isAddNewCodeVaultLoading || leftover.length === 0}
                handleClick={handleAddNewCodeVault}
                variant="secondary"
              >
                Добавить
              </ButtonElement>
            </div> */}

            <div className="flex gap-2">
              {isCodesSuccess ? (
                <Select
                  state={leftover}
                  setState={setLeftover}
                  search={search}
                  setSearch={setSearch}
                  options={codes.map((code) => ({
                    value: code.id,
                    valueName: `[${code.short_code_name}] ${code.code_name}`,
                  }))}
                  isDesktop={isDesktop}
                  isSearchable={true}
                />
              ) : (
                "Загрузка данных..."
              )}

              <ButtonElement
                buttonText="Добавить"
                isLoadingText="Добавление..."
                isLoading={isAddNewCodeVaultLoading}
                isDisabled={isAddNewCodeVaultLoading || leftover.length === 0}
                handleClick={handleAddNewCodeVault}
                variant="secondary"
              >
                Добавить
              </ButtonElement>
            </div>

            {isSuccess && vault ? (
              <div className="flex gap-2 flex-wrap">
                {vault.includes.map((code) => {
                  return (
                    <div key={code.code_in_vault_id}>
                      <Badge
                        variant="secondary"
                        className="rounded-md p-0 pl-3 flex gap-2"
                        key={`${code.id}`}
                      >
                        <span>{code.short_code_name}</span>|
                        <span>{code.code_name}</span>
                        <Button
                          onClick={() =>
                            deleteCodeVault({ id: code.code_in_vault_id })
                          }
                          variant="neutral"
                          size="icon"
                          disabled={isDeleteCodeVaultLoading}
                        >
                          <Trash2 size={15} />
                        </Button>
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditVault;
