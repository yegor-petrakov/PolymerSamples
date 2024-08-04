import { Outlet, Link, Navigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import Loader from "@/components/ui/Loader"
import AlertElement from "@/components/AlertElement"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const navigate = useNavigate()

    // console.log('persist login token ', token)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                // console.log('verifying refresh token')
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        content = (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    } else if (isError) { //persist: yes, token: no
        content = (
            <div className="p-3">
                <AlertElement error={error} />
                <Button variant="link" onClick={() => navigate('/')}>Авторизируйтесь</Button>
            </div>
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        // console.log("token: ", token)
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        // console.log('token and uninit')
        // console.log('token ', token)
        // console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}
export default PersistLogin