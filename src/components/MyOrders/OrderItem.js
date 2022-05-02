import { displayDateTime } from "../../functions";

const OrderItem = (props) => {
    const price = `$${Number(props.amount).toFixed(2)}`;
    return <tr className={`text-sm font-semibold text-gray-700 h-10 cursor-pointer 
    ${props.active === props.id && 'bg-indigo-50'}`} onClick={props.handleClick}>
        <td className="pl-3">{props.number_order}</td>
        <td>{props.dishes.length} items</td>
        <td>{price}</td>
        <td >
            <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{props.status}</span>
            </div>
        </td>
        <td>{displayDateTime(props.created_at)}</td>
    </tr>
}
export default OrderItem;