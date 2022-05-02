import { Delete } from "@material-ui/icons";
import { baseURL } from "../../api";

const CartItemMobile = (props) => {
    return <>
        <div className="bg-gray-100 rounded-xl p-3 flex justify-between mb-2">
            <div> <img src={baseURL + props.item.imgUrl} className="w-20 rounded-xl" alt="" /></div>
            <div className="mx-2">
                <h2 onClick={() => { props.history.push('product/' + props.item.id) }} className="font-medium text-xs cursor-pointer ">
                    {props.item.name}</h2>
                <p className="text-gray-500 text-xs uppercase mt-2">Color: {props.item.color} </p>
                <p className="text-gray-500 text-xs uppercase">Size: {props.item.size} </p>
                <p className="font-medium text-sm">${props.item.price}</p>
            </div>
            <div className="flex flex-col justify-between items-end">
                <div>
                    <span onClick={props.handleRemoveAllQty.bind(null, props.item)}>
                        <Delete style={{ fill: "gray" }} />
                    </span>
                </div>
                <div className="flex">
                    <button className="h-8 w-5 border" onClick={props.handleRemoveItem.bind(null, props.item)}>-</button>
                    <div className="h-8 w-10 bg-gray-200 flex items-center justify-center border">{props.item.quantity}</div>
                    <button className="h-8 w-5 border" onClick={props.handleAddItem.bind(null, props.item)}>+</button>
                </div>
            </div>
        </div>
    </>
}
export default CartItemMobile;