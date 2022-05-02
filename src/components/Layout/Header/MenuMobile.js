import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { uiActions } from "../../../redux/ui-slice";

const MenuMobile = () => {
    const dispatch = useDispatch();
    const handleCloseDrawer = () => {
        dispatch(uiActions.toggleOpenDrawer("menu"));
    }

    return <div className="container">
        <ul className="menu">
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/' onClick={handleCloseDrawer}>Home</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/about-us' onClick={handleCloseDrawer}>About us</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium"
                to='/category' onClick={handleCloseDrawer}>Category</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/blog' onClick={handleCloseDrawer}>Blog</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/contact' onClick={handleCloseDrawer}>Contact us</NavLink> </li>
        </ul>
    </div>
}
export default MenuMobile;