import { Delete } from '@material-ui/icons';
import classes from './CartItem.module.css';

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={`py-5 flex  border-b ${classes['cart-item']}`}>
            <div className="mr-2 w-20">
                <img src={props.imgUrl} alt="" />
            </div>
            <div className="flex-grow">
                <h2 className="text-gray-900 text-sm">{props.name}</h2>
                <div>
                    <span className="text-gray-500 text-sm">{props.size}</span>
                    <span className="text-gray-500 text-sm"> / {props.color}</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-3">
                        <span className="font-bold text-gray-900">{price}</span>
                        <span className="text-gray-500 text-sm"> x {props.amount}</span>
                    </div>
                    <div className={classes.actions}>
                        <button className="border" onClick={props.onRemove}>−</button>
                        <button className="border" onClick={props.onAdd}>+</button>
                    </div>
                </div>

            </div>
            <div className="w-10 text-right flex-1 cursor-pointer">
                <Delete style={{ fill: "gray" }} onClick={props.onRemoveAllItem} />
            </div>

        </li>
    );
};

export default CartItem;