// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetVaultsQuery } from "./vaultsApiSlice";

// import { ChevronLeft, SquarePen, Search } from "lucide-react";

// import { Link } from "react-router-dom";

// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// import { useMediaQuery } from "react-responsive";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { Button } from "@/components/ui/button";

// import { Badge } from "@/components/ui/badge";

// import Note from "@/components/Note";

// import AlertElement from "@/components/AlertElement";
// import Loader from "@/components/ui/Loader";

// import useTitle from "../../hooks/useTitle";
// import useAuth from "../../hooks/useAuth";

// const VaultsList = () => {
//   const {
//     data: vaults,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetVaultsQuery("Vault");

//   const navigate = useNavigate();
//   useTitle("Ячейки");

//   const isDesktop = useMediaQuery({
//     query: "(min-width: 924px)",
//   });

//   const handleEditClicked = (id) => {
//     navigate(`/dash/vaults/${id}`);
//   };

//   const handleCreateNewVaultClicked = () => navigate("/dash/vaults/create");

//   const { role } = useAuth();

//   const [leftoverSearch, setLeftoverSearch] = useState("");
//   const handleLeftoverSearchChange = (e) => setLeftoverSearch(e.target.value);

//   let table;

//   if (isLoading) {
//     table = (
//       <TableBody>
//         <TableRow>
//           <TableCell colSpan={3} className="h-24 text-center">
//             Загрузка данных...
//           </TableCell>
//         </TableRow>
//       </TableBody>
//     );
//   }

//   if (isSuccess) {
//     const filteredVaults = vaults.filter((vault) =>
//       leftoverSearch !== ""
//         ? vault.includes.some((leftover) =>
//             leftover.short_code_name
//               .toLowerCase()
//               .includes(leftoverSearch.toLowerCase())
//           )
//         : vault
//     );

//     if (filteredVaults.length === 0) {
//       table = (
//         <TableBody>
//           <TableRow>
//             <TableCell colSpan={3} className="h-24 text-center">
//               Нет данных
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       );
//     } else {
//       table = (
//         <TableBody>
//           {filteredVaults.map((vault) => {
//             const groupedCodes = vault.includes.reduce((groups, code) => {
//               const { short_code_name } = code;
//               if (short_code_name) {
//                 groups[short_code_name] = (groups[short_code_name] || 0) + 1;
//               }
//               return groups;
//             }, {});

//             const renderedCodes = Object.entries(groupedCodes).map(
//               ([shortCode, count]) => {
//                 const code = vault.includes.find(
//                   (code) => code.short_code_name === shortCode
//                 );
//                 return (
//                   <Link
//                     key={shortCode}
//                     to={
//                       role == "admin" || role == "editor"
//                         ? `/dash/codes/${code.code_id}`
//                         : ""
//                     }
//                     className="flex"
//                   >
//                     <Badge
//                       className={`${
//                         count === 1 ? "rounded-md" : "rounded-l-md"
//                       } hover:cursor-pointer flex gap-2`}
//                       variant="outline"
//                     >
//                       {shortCode}
//                     </Badge>
//                     {count > 1 && (
//                       <Badge
//                         className="rounded-r-md bg-blue-500 text-white"
//                         variant="secondary"
//                       >
//                         {count}
//                       </Badge>
//                     )}
//                   </Link>
//                 );
//               }
//             );

//             return (
//               <TableRow key={vault.id}>
//                 <TableCell className="px-4 py-3 space-x-1">
//                   <span>{vault.vault_name}</span>
//                   <div className="inline-block">
//                     <Note noteText={vault.note} />
//                   </div>
//                 </TableCell>
//                 <TableCell className="px-4 py-3 flex gap-1 flex-wrap items-center">
//                   {renderedCodes}
//                 </TableCell>

//                 {role == "admin" || role == "editor" ? (
//                   <TableCell className="px-4 py-3 text-right">
//                     <Button
//                       onClick={() => navigate(`/dash/vaults/${vault.id}`)}
//                       variant="neutral"
//                     >
//                       <SquarePen size={17} />
//                     </Button>
//                   </TableCell>
//                 ) : (
//                   ""
//                 )}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       );
//     }
//   }

//   return (
//     <div className="p-3">
//       <div className="flex justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <Button
//             onClick={() => navigate("/dash")}
//             size="icon"
//             variant="outline"
//           >
//             <ChevronLeft />
//           </Button>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Ячейки
//           </h4>
//         </div>
//         <Button onClick={handleCreateNewVaultClicked}>Создать</Button>
//       </div>

//       {isError ? (
//         <AlertElement error={error} />
//       ) : (
//         <>
//           <div
//             className={`flex mb-3 gap-3 w-full ${!isDesktop ? "flex-col" : ""}`}
//           >
//             <div className="w-full">
//               <div className="w-full">
//                 <Label>Сокращение маркировки</Label>
//                 <div className="flex w-full gap-1">
//                   <Input
//                     className="bg-white"
//                     onChange={handleLeftoverSearchChange}
//                     value={leftoverSearch}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="p-4">Название</TableHead>
//                 <TableHead className="p-4">Содержимое</TableHead>
//                 {role == "admin" || role == "editor" ? (
//                   <TableHead className="p-4"></TableHead>
//                 ) : (
//                   ""
//                 )}
//               </TableRow>
//             </TableHeader>
//             {table}
//           </Table>
//         </>
//       )}
//     </div>
//   );
// };

// export default VaultsList;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetVaultsQuery, useDeleteVaultMutation } from "./vaultsApiSlice";

import {
  ChevronLeft,
  SquarePen,
  Search,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useMediaQuery } from "react-responsive";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import Note from "@/components/Note";

import AlertElement from "@/components/AlertElement";
import Loader from "@/components/ui/Loader";

import useTitle from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VaultsList = () => {
  const {
    data: vaults,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVaultsQuery("Vault", {
    pollingInterval: 60000,
    skipPollingIfUnfocused: true,
  });

  const [
    deleteVault,
    {
      isLoading: isDeleteVaultLoading,
      isSuccess: isDeleteVaultSuccess,
      isError: isDeleteVaultError,
      error: deleteVaultError,
    },
  ] = useDeleteVaultMutation();

  const navigate = useNavigate();
  useTitle("Ячейки");

  const isDesktop = useMediaQuery({
    query: "(min-width: 924px)",
  });

  const handleEditClicked = (id) => {
    navigate(`/dash/vaults/${id}`);
  };

  const handleDeleteClicked = (id) => {
    deleteVault({ id });
  };

  const handleCreateNewVaultClicked = () => navigate("/dash/vaults/create");

  const { role } = useAuth();

  const [leftoverSearch, setLeftoverSearch] = useState("");
  const handleLeftoverSearchChange = (e) => setLeftoverSearch(e.target.value);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([
    {
      id: "includes",
      value: leftoverSearch,
    },
  ]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      accessorKey: "vault_name",
      header: "Название",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-1">{row.getValue("vault_name")}</span>
          <div className="inline-block">
            <Note noteText={row.original.note} />
          </div>
        </div>
      ),
    },
    {
      accessorKey: "includes",
      header: "Содержимое",
      cell: ({ row }) => {
        const vault = row.original;
        const groupedCodes = vault.includes.reduce((groups, code) => {
          const { short_code_name } = code;
          if (short_code_name) {
            groups[short_code_name] = (groups[short_code_name] || 0) + 1;
          }
          return groups;
        }, {});

        const renderedCodes = Object.entries(groupedCodes).map(
          ([shortCode, count]) => {
            const code = vault.includes.find(
              (code) => code.short_code_name === shortCode
            );
            return (
              <Link
                key={shortCode}
                to={
                  role == "admin" || role == "editor"
                    ? `/dash/codes/${code.code_id}`
                    : ""
                }
                className="flex"
              >
                <Badge
                  className={`${
                    count === 1 ? "rounded-md" : "rounded-l-md"
                  } hover:cursor-pointer flex gap-2`}
                  variant="outline"
                >
                  {shortCode}
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
          }
        );

        return (
          <div className="flex gap-1 flex-wrap items-center">
            {renderedCodes}
          </div>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true; // Show all rows if no filter value
        return row.original.includes.some((leftover) =>
          leftover.short_code_name
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const vault = row.original;

        return role == "editor" || role == "admin" ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditClicked(vault.id)}>
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-100 focus:text-red-500"
                onClick={() => handleDeleteClicked(vault.id)}
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          ""
        );
      },
    },
  ];

  const table = useReactTable({
    data: vaults || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters);
      const searchFilter = filters.find((filter) => filter.id === "includes");
      if (searchFilter) {
        setLeftoverSearch(searchFilter.value);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <AlertElement error={error} />;
  }

  if (!table) {
    return <div>Error: Table is undefined</div>;
  }

  return (
    <div className="p-3">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate("/dash")}
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Ячейки
          </h4>
        </div>
        <Button onClick={handleCreateNewVaultClicked}>Создать</Button>
      </div>

      <div className={`flex mb-3 gap-3 w-full ${!isDesktop ? "flex-col" : ""}`}>
        <div className="w-full">
          <div className="w-full">
            <Label htmlFor="leftover_short_code_name">
              Сокращение маркировки
            </Label>
            <div className="flex w-full gap-1 relative">
              <Input
                id="leftover_short_code_name"
                className="bg-white pl-9"
                onChange={(e) => {
                  setLeftoverSearch(e.target.value);
                  setColumnFilters([
                    {
                      id: "includes",
                      value: e.target.value,
                    },
                  ]);
                }}
                value={leftoverSearch}
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 left-2">
                <Search color="#64748b" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VaultsList;
