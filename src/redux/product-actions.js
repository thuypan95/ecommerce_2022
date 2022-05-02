import { baseURL, domainCategory, domainProduct } from "../api";
import { productActions } from "./product-slice";
import { uiActions } from "./ui-slice";

const url = baseURL + domainProduct
export const fetchProductDataByCategory = (idCat) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${url}?categories=${idCat}`);
            const data = await response.json();
            return data;
        }
        try {
            dispatch(uiActions.isLoadingFunc(true));
            const dataFetch = await fetchData();
            dispatch(
                productActions.listProductByCategory({
                    list: dataFetch
                })
            )
            dispatch(uiActions.isLoadingFunc(false));

        }
        catch (error) {
            dispatch(uiActions.isLoadingFunc(false));

        }
    }
}
export const fetchCategory = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(baseURL + domainCategory);
            const data = await response.json();
            return data;
        }
        try {
            const dataFetch = await fetchData();
            dispatch(
                productActions.listCategory({
                    list: dataFetch
                })
            )
        }
        catch (error) {
            console.log(error)
        }
    }
}