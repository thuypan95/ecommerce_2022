import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        isOpenDrawer: { cart: false, menu: false, filter: false, search: false },
    },
    reducers: {
        isLoadingFunc(state, action) {
            state.isLoading = action.payload;
        },
        toggleOpenDrawer(state, action) {
            if (action.payload === 'cart') {
                state.isOpenDrawer.cart = !state.isOpenDrawer.cart;
            }
            else if (action.payload === 'menu') {
                state.isOpenDrawer.menu = !state.isOpenDrawer.menu;
            }
            else if (action.payload === 'filter') {
                state.isOpenDrawer.filter = !state.isOpenDrawer.filter;
            }
            else if (action.payload === 'search') {
                state.isOpenDrawer.search = !state.isOpenDrawer.search;
            }
        },
    }
});
export const uiActions = uiSlice.actions;
export default uiSlice;