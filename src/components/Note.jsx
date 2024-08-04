import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Info } from "lucide-react"

import React from 'react'

const Note = ({ noteText }) => {

    if (noteText !== "") {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <Info color="blue" size={15} cursor='pointer' />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{noteText}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    } else {
        return ''
    }
}

export default Note