import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
        listCategory: [],
        filterCat: [],
        filterColor: [],
        filterSize: [],
        filterPriceStart: 0,
        filterPriceEnd: 100000000000
    },
    reducers: {
        listProductByCategory(state, action) {
            state.list = action.payload.list;
        },
        listCategory(state, action) {
            state.listCategory = action.payload.list;
        },
        inputChangeCategory(state, action) {
            let selected = [...state.filterCat];
            let find = selected.indexOf(action.payload)

            if (find > -1) {
                selected.splice(find, 1)
            } else {
                selected.push(action.payload);
            }
            state.filterCat = [...selected];

        },
        inputChangeColor(state, action) {
            let selected = [...state.filterColor];
            let find = selected.indexOf(action.payload)

            if (find > -1) {
                selected.splice(find, 1)
            } else {
                selected.push(action.payload);
            }
            state.filterColor = [...selected];
        },
        inputChangeSize(state, action) {
            let selected = [...state.filterSize];
            let find = selected.indexOf(action.payload)

            if (find > -1) {
                selected.splice(find, 1)
            } else {
                selected.push(action.payload);
            }
            state.filterSize = [...selected];
        },
        changePrice(state, action) {
            state.filterPriceStart = action.payload.start;
            state.filterPriceEnd = action.payload.end;


        },
        deleteFilter(state, action) {
            state.filterCat.length = 0;
            state.filterColor.length = 0;
            state.filterSize.length = 0;
            state.filterPriceStart = 0;
            state.filterPriceEnd = 100000000000;
        }
    },
});

export const productActions = productSlice.actions;

export default productSlice;
