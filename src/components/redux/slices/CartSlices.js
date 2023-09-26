import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalamount: 0,
    totalquantity: 0
}

const CartSlices = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        addItemCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem);
            state.totalquantity++;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    image: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalprice: newItem.price
                })
            }

            else {
                existingItem.quantity++
                existingItem.totalprice = existingItem.totalprice + newItem.price
            }

            state.totalamount = state.items.reduce((total, item) => (total + item.price * item.quantity), 0)
        },

        deleteItemCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalquantity--

            if (existingItem) {
                state.items = state.items.filter(item => item.id !== id)
                existingItem.totalprice = existingItem.totalprice - existingItem.price
                // state.totalquantity = state.totalquantity - existingItem.totalquantity
            }

            state.totalamount = state.items.reduce((total, item) => (total + item.price * item.quantity), 0)
        }
    }
});

export const CartActions = CartSlices.actions

export default CartSlices.reducer