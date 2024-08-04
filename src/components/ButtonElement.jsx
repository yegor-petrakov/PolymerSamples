import React from 'react'
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'

const ButtonElement = ({
    variant,
    buttonText,
    isLoadingText,
    handleClick,
    isLoading,
    isDisabled,
    path
}) => {

    if (path) {
        const navigate = useNavigate()
        
        return (
            <Button onClick={() => navigate(path)} size="icon" variant="outline">
                <ChevronLeft />
            </Button>
        )
    } else {
        return (
            isLoading ? (
                <Button variant={variant} disabled={isLoading}>
                    {isLoadingText}
                </Button>
            ) : (
                <Button variant={variant} onClick={handleClick} disabled={isDisabled}>
                    {buttonText}
                </Button>
            )
        )
    }
}

export default ButtonElement
