import React, { useState } from "react";
import HeaderCartButton from "./HeaderCartButton";
import Menu from './Menu';
import FormSearch from "../Search/FormSearch";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../../redux/auth-slice";
import Cart from "../../CartInDrawer/Cart";
import { Toast } from "../../../functions";
import HeaderMobile from "./HeaderMobile";
import DrawerUI from "../../UI/DrawerUI";
import DropdownAccount from "./DropdownAccount";
const Header = () => {
    const [isOpenDropdownAccount, setIsOpenDropdownAccount] = useState(false);
    const isLogin = useSelector(state => state.auth.isLogin);
    const username = useSelector(state => state.auth.username);
    const isOpenDrawer = useSelector(state => state.ui.isOpenDrawer.cart);
    const dispatch = useDispatch();
    let history = useHistory();
    const handleLogout = async () => {
        await dispatch(AuthActions.logout());
        history.push('/');
        Toast.success('Logout success')
    }
    const handleMouseEnter = () => {
        setIsOpenDropdownAccount(true)
    }
    const handleMouseLeave = () => {
        setIsOpenDropdownAccount(false)
    }

    return <React.Fragment>
        <DrawerUI isOpenDrawer={isOpenDrawer} typeDrawer='cart'>
            <Cart />
        </DrawerUI>
        <header className="hidden lg:block lg:fixed w-full top-0 z-20 bg-white">
            <div className="header-bottom flex items-center justify-between container pt-5">
                <span className="cursor-pointer" onClick={() => history.push("/")}>
                    <span className="text-3xl font-bold text-green-500">REPLEI 1995</span>
                </span>
                <FormSearch />
                <div className="items-center flex">
                    {isLogin ?
                        <div className="relative mr-5 cursor-pointer flex h-11 items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            Hi, {username}!
                            {isOpenDropdownAccount && <DropdownAccount handleLogout={handleLogout} history={history} />}
                        </div> :
                        <span className="mr-5 cursor-pointer" onClick={() => history.push("/sign-in")}>
                            Sign in
                        </span>
                    }
                    <HeaderCartButton />
                </div>
            </div>
            <Menu />
        </header>
        <HeaderMobile history={history} />

    </React.Fragment>
}
export default Header
