import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const SelectElement = ({ labelText, name, handleValueChange, setState }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{labelText}</Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите остаток" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={1} value={1}>
            1
          </SelectItem>
          {/* {codes ? Object.values(codes).map((code) => (
                        <SelectItem key={code.id} value={code.id}>
                            <Badge variant='outline' className='mr-2 rounded-md'>
                                {code.short_code_name}
                            </Badge>
                            {code.code_name}
                        </SelectItem>
                    )) : '1'} */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectElement;
