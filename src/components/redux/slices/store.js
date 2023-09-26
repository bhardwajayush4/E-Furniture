import { configureStore } from '@reduxjs/toolkit'
import CartSlices from './CartSlices';

const store = configureStore({
    reducer:{
        cart: CartSlices
    }
})

export default store;