import { Navigate, Route, Routes } from "react-router-dom"
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProductsDetails from '../pages/ProductsDetails'
import ProtectedRoute from "./ProtectedRoute"
import AllProducts from "../admin/AllProducts"
import Dashboard from "../admin/Dashboard"
import AdminNav from "../admin/AdminNav"
import AddProducts from "../admin/AddProducts"


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='home' />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} /> */}

            <Route path="/" element={<ProtectedRoute />} >
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/adminnav" element={<AdminNav />} />
                <Route path="/dashboard/all-products" element={<AllProducts />} />
                <Route path="/dashboard/add-products" element={<AddProducts />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop/:id" element={<ProductsDetails />} />
        </Routes>
    )
}

export default Routers