import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let role = "nobody"

    if (token) {

        const decoded = jwtDecode(token)

        const role = decoded.clientRole
        const userName = decoded.userName
        
        return { userName, role }
    }

    return { role }
}
export default useAuth