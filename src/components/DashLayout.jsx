import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const DashLayout = () => {
    return (
        <div>
            <Navigation />
            <div>
                <Outlet />
            </div>
        </div>
    )
}
export default DashLayout