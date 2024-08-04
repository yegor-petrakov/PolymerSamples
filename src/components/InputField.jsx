import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputField = ({ labelText, name, handleChange, value, isDisabled, isValid }) => {

    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>
                {labelText}
            </Label>
            <Input
                onChange={handleChange}
                value={value}
                type="text"
                id={name}
                disabled={isDisabled}
            />
        </div>
    )
}

export default InputField