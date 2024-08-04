import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, SquarePen, Download, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useAuth from "@/hooks/useAuth";
import { useDownloadExcel } from "react-export-table-to-excel";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Loader from "@/components/ui/Loader";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import StockLevel from "@/components/StockLevel";

import AlertElement from "@/components/AlertElement";

import Note from "@/components/Note";

import Select from "@/components/ui/Select";

import useTitle from "../../hooks/useTitle";

import { useGetCodesQuery } from "./codesApiSlice";

const CodesList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { role } = useAuth();

  useTitle("Маркировки");

  const {
    data: codes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCodesQuery("Code", {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
  });

  const date = new Date();

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Маркировки_${formatDate(date)}`,
    sheet: "Маркировки",
  });

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const [shortCodeNameSearch, setShortCodeNameSearch] = useState("");
  const handleShortCodeNameSearchChange = (e) =>
    setShortCodeNameSearch(e.target.value);

  const [codeNameSearch, setCodeNameSearch] = useState("");
  const handleCodeNameSearchChange = (e) => setCodeNameSearch(e.target.value);

  const [supplierCodeNameSearch, setSupplierCodeNameSearch] = useState("");
  const handleSupplierCodeNameSearchChange = (e) =>
    setSupplierCodeNameSearch(e.target.value);

  const [stockLevelSearch, setStockLevelSearch] = useState({
    value: "",
    valueName: "Выберите значение",
  });
  const [typeSearch, setTypeSearch] = useState({
    value: "",
    valueName: "Выберите значение",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 924px)",
  });

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
    const filteredCodes = codes
      .filter((code) =>
        shortCodeNameSearch.toLowerCase() === ""
          ? code
          : code.short_code_name
              .toLowerCase()
              .includes(shortCodeNameSearch.toLowerCase())
      )
      .filter((code) =>
        codeNameSearch.toLowerCase() === ""
          ? code
          : code.code_name.toLowerCase().includes(codeNameSearch.toLowerCase())
      )
      .filter((code) =>
        supplierCodeNameSearch.toLowerCase() === ""
          ? code
          : code.supplier_code_name
              .toLowerCase()
              .includes(supplierCodeNameSearch.toLowerCase())
      )
      .filter((code) =>
        stockLevelSearch.value === ""
          ? code
          : code.stock_level.includes(stockLevelSearch.value)
      )
      .filter((code) =>
        typeSearch.value === "" ? code : code.type.includes(typeSearch.value)
      );

    if (filteredCodes.length === 0) {
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
      table = (
        <TableBody>
          {filteredCodes.map((code) => {
            return (
              <TableRow key={code.id}>
                <TableCell className="px-4 py-3">
                  {code.short_code_name}
                </TableCell>
                <TableCell className="px-4 py-3 space-x-1">
                  <span>{code.code_name}</span>
                  <div className="inline-block">
                    {code.note !== "" ? <Note noteText={code.note} /> : ""}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  {code.supplier_code_name}
                </TableCell>
                <TableCell className="px-4 py-3">{code.type}</TableCell>
                <TableCell className="px-4 py-3">
                  <StockLevel stockLevel={code.stock_level} />
                </TableCell>

                <TableCell className="px-4 py-3 flex gap-1 flex-wrap">
                  {Object.keys(
                    code.in_vaults.reduce((acc, current) => {
                      if (acc[current.vault_name]) {
                        acc[current.vault_name]++;
                      } else {
                        acc[current.vault_name] = 1;
                      }
                      return acc;
                    }, {})
                  ).map((vaultName, index) => {
                    const count = code.in_vaults.filter(
                      (vault) => vault.vault_name === vaultName
                    ).length;
                    return (
                      <Link
                        key={index}
                        to={
                          code.in_vaults.find(
                            (vault) => vault.vault_name === vaultName
                          )
                            ? role === "admin" || role === "editor"
                              ? `/dash/vaults/${
                                  code.in_vaults.find(
                                    (vault) => vault.vault_name === vaultName
                                  ).vault_id
                                }`
                              : ""
                            : ""
                        }
                        className="flex"
                      >
                        <Badge
                          className={count > 1 ? "rounded-l" : "rounded"}
                          variant="outline"
                        >
                          {vaultName}
                        </Badge>
                        {count > 1 && (
                          <Badge
                            className="rounded-r-md bg-blue-500 text-white"
                            variant="secondary"
                          >
                            {count}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </TableCell>

                {role == "admin" || role == "editor" ? (
                  <TableCell className="px-4 py-3 text-right">
                    <Button
                      onClick={() => navigate(`/dash/codes/${code.id}`)}
                      variant="neutral"
                    >
                      <SquarePen size={17} />
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            );
          })}
        </TableBody>
      );
    }
  }

  return (
    <>
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/dash")}
              size="icon"
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Маркировки
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              size="icon"
              onClick={onDownload}
            >
              <Download />
            </Button>
            <Button onClick={() => navigate("/dash/codes/create")}>
              Создать
            </Button>
          </div>
        </div>

        {isError ? (
          <AlertElement error={error} />
        ) : (
          <>
            <div
              className={`flex mb-3 gap-3 w-full ${
                !isDesktop ? "flex-col" : ""
              }`}
            >
              <div className="w-full">
                <div className="w-full">
                  <Label htmlFor="short_code_name">Сокращение</Label>
                  <div className="flex w-full gap-1 relative">
                    <Input
                      id="short_code_name"
                      className="bg-white pl-9"
                      onChange={handleShortCodeNameSearchChange}
                      value={shortCodeNameSearch}
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                      <Search color="#64748b" size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <Label htmlFor="code_name">Маркировка</Label>
                  <div className="flex w-full gap-1 relative">
                    <Input
                      id="code_name"
                      className="bg-white pl-9"
                      onChange={handleCodeNameSearchChange}
                      value={codeNameSearch}
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                      <Search color="#64748b" size={20} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <Label htmlFor="supplier_code_name_search">
                    Код поставщика
                  </Label>
                  <div className="flex w-full gap-1 relative">
                    <Input
                      id="supplier_code_name_search"
                      className="bg-white pl-9"
                      onChange={handleSupplierCodeNameSearchChange}
                      value={supplierCodeNameSearch}
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                      <Search color="#64748b" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="stock_level_search">Количество</Label>
                <Select
                  id="stock_level_search"
                  state={stockLevelSearch}
                  setState={setStockLevelSearch}
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
                <Label htmlFor="type_search">Тип</Label>
                <Select
                  id="type_search"
                  state={typeSearch}
                  setState={setTypeSearch}
                  options={[
                    { value: "", valueName: "Выберите значение" },
                    { value: "Лента", valueName: "Лента" },
                    { value: "Ziplink", valueName: "Ziplink" },
                    { value: "Плоский ремень", valueName: "Плоский ремень" },
                    { value: "Зубчатый ремень", valueName: "Зубчатый ремень" },
                    { value: "Покрытие", valueName: "Покрытие" },
                    { value: "Другое", valueName: "Другое" },
                  ]}
                  isDesktop={isDesktop}
                />
              </div>
            </div>
            <Table ref={tableRef}>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-4">Сокращение</TableHead>
                  <TableHead className="p-4">Маркировка</TableHead>
                  <TableHead className="p-4">Код поставщика</TableHead>
                  <TableHead className="p-4">Тип</TableHead>
                  <TableHead className="p-4">Количество</TableHead>
                  <TableHead className="p-4">Остатки</TableHead>
                  {role == "admin" || role == "editor" ? (
                    <TableHead className="p-4"></TableHead>
                  ) : (
                    ""
                  )}
                </TableRow>
              </TableHeader>
              {table}
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default CodesList;
