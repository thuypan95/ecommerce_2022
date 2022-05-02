import { useEffect } from "react";
import Filter from "../components/Category/Filter";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import ListProduct from "../components/Category/ListProduct";
import { checkDeviceType } from "../functions";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/ui-slice";
import DrawerUI from "../components/UI/DrawerUI";
import config from "../config";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";
const CategoryPage = () => {
    const device = checkDeviceType();
    const isOpenDrawer = useSelector(state => state.ui.isOpenDrawer.filter);

    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Category';
    }, [])
    return <>
        <Breadcrumb title="Category">
            <BreadcrumbItem message="Category" active="true" />
        </Breadcrumb>
        <DrawerUI isOpenDrawer={isOpenDrawer} typeDrawer='filter'>
            <Filter />
        </DrawerUI>
        {
            device !== config.isDesktop &&
            <button
                onClick={() => { dispatch(uiActions.toggleOpenDrawer('filter')) }}
                className="fixed z-10 bottom-0 bg-black text-white w-full justify-center py-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" fill="#fff" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24 M24,24H0" fill="#fff" /><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" /><path d="M0,0h24v24H0V0z" fill="none" /></g></svg>

                Filter</button>
        }
        <div className="lg:container lg:py-16 lg:flex px-3 lg:px-0 relative -mt-5 lg:mt-0 rounded-t-2xl lg:rounded-none bg-white">

            {
                device === config.isDesktop && <Filter />
            }

            <ListProduct />
        </div>
    </>

}
export default CategoryPage;