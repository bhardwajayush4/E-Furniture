import Routers from '../../routers/Routers'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useLocation } from 'react-router'
import AdminNav from '../../admin/AdminNav'

const Layout = () => {

    const location = useLocation()

    return (
        <>
            {location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />}
            <div>
                <Routers />
            </div>
            <Footer />
        </>
    )
}

export default Layout