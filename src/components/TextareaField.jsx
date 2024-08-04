import React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const TextareaField = ({ labelText, name, handleChange, value, isDisabled }) => {
    return (
        <div className="grid w-full gap-1.5">
            <Label htmlFor={name}>
                {labelText}
            </Label>
            <Textarea
                onChange={handleChange}
                value={value}
                id={name}
                disabled={isDisabled}
            />
        </div>
    )
}

export default TextareaField