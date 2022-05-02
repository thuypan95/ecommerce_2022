import { NavLink } from 'react-router-dom';

const Menu = () => {
    return <div className="container">
        <ul className="flex justify-center menu">
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/'>Home</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/about-us'>About us</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/category'>Category</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/blog'>Blog</NavLink> </li>
            <li><NavLink exact className="py-5 px-6 block font-medium" to='/contact'>Contact us</NavLink> </li>
        </ul>
    </div>
}
export default Menu;