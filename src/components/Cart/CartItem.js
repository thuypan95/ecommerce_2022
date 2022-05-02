import { Delete } from "@material-ui/icons";

const CartItem = (props) => {
    return <tr className="border">
        <td>
            <div className="flex items-center">
                <div className="p-2">
                    <img src={props.item.imgUrl} className="w-24" alt="" />
                </div>
                <div className="ml-3">
                    <h2 onClick={() => { props.history.push('product/' + props.item.id) }} className="font-medium text-xs cursor-pointer ">{props.item.name}</h2>
                    <p className="text-gray-500 text-xs uppercase mt-2">Color: {props.item.color} </p>
                    <p className="text-gray-500 text-xs uppercase">Size: {props.item.size} </p>
                </div>
            </div>
        </td>
        <td><span className="font-medium text-sm">${props.item.price}</span> </td>
        <td>
            <div className="flex">
                <button className="h-8 w-5 border" onClick={props.handleRemoveItem.bind(null, props.item)}>-</button>
                <div className="h-8 w-10 bg-gray-200 flex items-center justify-center border">{props.item.quantity}</div>
                <button className="h-8 w-5 border" onClick={props.handleAddItem.bind(null, props.item)}>+</button>
            </div>
        </td>
        <td><span className="font-bold">${props.item.price * props.item.quantity}</span></td>
        <td>
            <span onClick={props.handleRemoveAllQty.bind(null, props.item)}>
                <Delete style={{ fill: "gray" }} />
            </span>
        </td>
    </tr>
}
export default CartItem;