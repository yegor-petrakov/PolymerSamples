import React from 'react'
import { Info } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const TooltipElement = ({ tooltipText }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info size={15} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipElement