import React, { useEffect, useState } from "react";
import { useGetCodesQuery } from "@/features/codes/codesApiSlice";

import { Trash2, PackageOpen } from "lucide-react";

import { Label } from "./ui/label";

import { Button } from "./ui/button";

import { Badge } from "@/components/ui/badge";

import ButtonElement from "./ButtonElement";

import {
  useAddNewCodeVaultMutation,
  useDeleteCodeVaultMutation,
} from "../features/vaults/codeVaultApiSlice";

const CodeVault = ({ currentVaultId }) => {
  const {
    data: codes,
    isLoading: isCodesLoading,
    isSuccess: isCodesSuccess,
    isError: isCodesError,
    error: codesError,
  } = useGetCodesQuery();

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
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteCodeVaultMutation();

  const {
    data: codeVault,
    isLoading: isCodeVaultLoading,
    isSuccess: isCodeVaultSuccess,
    isError: isCodeVaultError,
    error: codeVaultError,
  } = useGetCodeVaultByVaultIdQuery(currentVaultId);

  const [leftover, setLeftover] = useState("");

  const handleLeftoverChange = (e) => setLeftover(e);

  const handleAddNewCodeVault = () =>
    addNewCodeVault({
      vault_id: currentVaultId,
      code_id: leftover,
    });

  let content;

  if (isCodeVaultLoading) {
    content = <p>Загрузка данных...</p>;
  }

  if (isCodeVaultSuccess) {
    content = codeVault.map((cv) => {
      return (
        <div key={cv.id}>
          <Badge
            variant="secondary"
            className="rounded-md p-0 pl-3 flex gap-2"
            key={`${cv.id}`}
          >
            <span>{cv.code_data.short_code_name}</span>|
            <span>{cv.code_data.code_name}</span>
            <Button
              onClick={() => deleteCodeVault({ id: cv.id })}
              variant="neutral"
              size="icon"
              disabled={isDeleteLoading}
            >
              <Trash2 size={15} />
            </Button>
          </Badge>
        </div>
      );
    });
  }

  if (isCodeVaultError) {
    content = (
      <div className="flex w-full border shadow-sm rounded-md py-1 bg-slate-50 justify-center">
        <p className="text-sm flex text-slate-600">
          <span>Ячейка не заполнена</span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="leftovers">Остатки</Label>

      <div className="flex gap-2">
        <Select id="leftovers" onValueChange={handleLeftoverChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите материал" />
          </SelectTrigger>
          <SelectContent>
            {codes
              ? Object.values(codes).map((code) => (
                  <SelectItem key={code.id} value={code.id}>
                    <Badge variant="outline" className="mr-2 rounded-md">
                      {code.short_code_name}
                    </Badge>
                    {code.code_name}
                  </SelectItem>
                ))
              : "1"}
          </SelectContent>
        </Select>

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
      <div className="flex gap-2 flex-wrap mt-2">{content}</div>
    </div>
  );
};

export default CodeVault;

// import React, { useEffect } from 'react'

// import { useGetVaultByIdQuery } from '@/features/vaults/vaultsApiSlice'

// const CodeVault = ({ currentVaultId }) => {

//   const {
//     data: vault,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   } = useGetVaultByIdQuery(currentVaultId)

//   let content

//   if (isSuccess) {
//     content = (
//       <div>
//         {vault[0].includes.map((code) => <p key={code.code_id}>{code.code_index}</p>)}
//       </div>
//     )
//   }

//   if (isError) {
//     console.log(error)
//     content = (
//       <div>
//         Ошибка
//       </div>
//     )
//   }

//   return (
//     <div className="grid w-full items-center gap-1.5">

//       <Label htmlFor="leftovers">
//         Остатки
//       </Label>

//       <div className='flex gap-2'>

//         <Select id="leftovers" onValueChange={handleLeftoverChange}>
//           <SelectTrigger className="w-full">

//             <SelectValue placeholder='Выберите материал' />

//           </SelectTrigger>
//           <SelectContent>
//             {codes ? Object.values(codes).map((code) => (
//               <SelectItem key={code.id} value={code.id}>
//                 <Badge variant='outline' className='mr-2 rounded-md'>
//                   {code.short_code_name}
//                 </Badge>
//                 {code.code_name}
//               </SelectItem>
//             )) : '1'}
//           </SelectContent>
//         </Select>

//         <ButtonElement
//           buttonText="Добавить"
//           isLoadingText="Добавление..."
//           isLoading={isAddNewCodeVaultLoading}
//           isDisabled={isAddNewCodeVaultLoading || leftover.length === 0}
//           handleClick={handleAddNewCodeVault}
//           variant="secondary">
//           Добавить
//         </ButtonElement>

//       </div >
//       <div className='flex gap-2 flex-wrap mt-2'>
//         {content}
//       </div>
//     </div>
//   )
// }

// export default CodeVault
