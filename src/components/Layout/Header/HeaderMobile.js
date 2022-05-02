import { Menu, Search } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import DrawerUI from "../../UI/DrawerUI";
import HeaderCartButton from "./HeaderCartButton"
import MenuMobile from "./MenuMobile";
import SearchMobile from "./SearchMobile";
const HeaderMobile = (props) => {
    const isOpenDrawer = useSelector(state => state.ui.isOpenDrawer.menu);
    const isOpenDrawerSearch = useSelector(state => state.ui.isOpenDrawer.search);
    const dispatch = useDispatch();
    return <div className="flex items-center justify-between p-3 lg:hidden">
        <DrawerUI isOpenDrawer={isOpenDrawer} typeDrawer='menu'>
            <MenuMobile />
        </DrawerUI>
        <DrawerUI isOpenDrawer={isOpenDrawerSearch} typeDrawer='search'>
            <SearchMobile />
        </DrawerUI>
        <div onClick={() => { dispatch(uiActions.toggleOpenDrawer('menu')) }}><Menu /></div>

        <span className="cursor-pointer" onClick={() => props.history.push("/")}>
            <span className="text-2xl font-bold text-green-500">REPLEI 1995</span>
        </span>
        <div onClick={() => { dispatch(uiActions.toggleOpenDrawer('search')) }}><Search /> </div>
        <HeaderCartButton />

    </div>
}
export default HeaderMobile;