import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Heading from '@/components/Heading'
import InputField from '@/components/InputField'
import TextareaField from '@/components/TextareaField'
import ButtonElement from '@/components/ButtonElement'
import AlertElement from '@/components/AlertElement'

import { useAddNewVaultMutation } from './vaultsApiSlice'

import useTitle from '../../hooks/useTitle'

const CreateVault = () => {

    const navigate = useNavigate()
    useTitle("Создание")

    const [addNewVault, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewVaultMutation()

    const [vaultName, setVaultName] = useState('')
    const handleVaultNameChange = (e) => setVaultName(e.target.value)

    const [note, setNote] = useState('')
    const handleNoteChange = (e) => setNote(e.target.value)

    useEffect(() => {
        if (isSuccess) {
            setVaultName('')
            setNote('')
            navigate('/dash/vaults')
        }
    }, [isSuccess, navigate])

    const canSave = vaultName.length > 0 && !isLoading

    const handleCreateNewVault = () => addNewVault({
        vault_name: vaultName,
        note
    })

    return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <ButtonElement
                        path="/dash/vaults"
                    />
                    <Heading level={1} headingText="Создание ячейки" />
                </div>
            </div>
            <Card>
                <CardContent className="py-4 pt-8 flex flex-col gap-4">

                    <InputField
                        labelText="Название"
                        name="vault_name"
                        value={vaultName}
                        handleChange={handleVaultNameChange}
                        isDisabled={isLoading}
                    />

                    <TextareaField
                        labelText="Примечание"
                        name="note"
                        handleChange={handleNoteChange}
                        value={note}
                        isDisabled={isLoading}
                    />

                </CardContent>
                <CardFooter>
                    <div className='w-full space-y-4'>
                        {isError ? (
                            <AlertElement error={error} />
                        ) : (
                            ''
                        )}

                        <ButtonElement
                            variant="default"
                            buttonText="Создать"
                            isLoadingText="Создание..."
                            handleClick={handleCreateNewVault}
                            isLoading={isLoading}
                            isDisabled={!canSave}
                        />
                    </div>

                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateVault