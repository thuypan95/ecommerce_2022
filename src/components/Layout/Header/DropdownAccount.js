const DropdownAccount = (props) => {
    return <ul className="bg-white drop-shadow-lg filter rounded-md absolute top-10 w-44 left-0">
        {/* <li className="p-3.5 hover:bg-gray-100 rounded-t-md text-sm" onClick={() => props.history.push("/my-account")}>
            My Account
        </li> */}
        <li className="p-3.5 hover:bg-gray-100 text-sm" onClick={() => props.history.push("/my-orders")}>
            My Orders
        </li>
        <li className="p-3.5 hover:bg-gray-100 rounded-b-md text-sm" onClick={props.handleLogout}>
            Sign Out
        </li>
    </ul>
}
export default DropdownAccount;