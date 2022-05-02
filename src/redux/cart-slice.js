import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,
        totalQty: 0,
        note: ''
    },
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.colorId === newItem.colorId && item.sizeId === newItem.sizeId && item.id === newItem.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            if (!existingCartItem) {
                state.items.push({
                    imgUrl: newItem.images[0].url,
                    id: newItem.id,
                    price: newItem.price,
                    quantity: action.payload.quantity,
                    name: newItem.name,
                    color: action.payload.color ? action.payload.color : '',
                    colorId: action.payload.colorId,
                    sizeId: action.payload.sizeId,
                    size: action.payload.size ? action.payload.size : ''
                });
            }
            else {

                // console.log(JSON.parse(JSON.stringify(varible)));
                // existingCartItem.quantity++;
                existingCartItem.quantity = existingCartItem.quantity + action.payload.quantity;
            }

            state.totalPrice = state.items.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
            state.totalQty = state.items.reduce((total, item) => {
                return total + item.quantity;
            }, 0);

        },
        removeItem(state, action) {
            state.totalQty--;
            const newItem = action.payload;
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.colorId === newItem.colorId && item.sizeId === newItem.sizeId && item.id === newItem.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            if (existingCartItem.quantity === 1) {
                state.items.splice(existingCartItemIndex, 1);
            }
            else {
                existingCartItem.quantity--;
            }
            state.totalPrice = state.items.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0)

        },
        removeAllQtyItem(state, action) {
            const newItem = action.payload;

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.colorId === newItem.colorId && item.sizeId === newItem.sizeId && item.id === newItem.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            state.totalQty -= existingCartItem.quantity;

            existingCartItem.quantity = 0;
            state.items.splice(existingCartItemIndex, 1);
            state.totalPrice = state.items.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
        },
        clearAll(state) {
            state.items.length = 0;
            state.totalPrice = 0;
            state.totalQty = 0;
        },
        addNote(state, action) {
            state.note = action.payload;
        }
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;