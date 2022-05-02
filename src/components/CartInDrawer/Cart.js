import classes from './Cart.module.css';
import React from 'react';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux/cart-slice';
import { useHistory } from 'react-router-dom';
import { uiActions } from '../../redux/ui-slice';

const Cart = () => {
    let history = useHistory()
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const priceTotal = `$${Math.abs(cart.totalPrice).toFixed(2)}`;

    const handlerAddItem = (item) => {
        dispatch(cartActions.addItem({ ...item, quantity: 1 }));
    }
    const handlerRemoveItem = (item) => {
        dispatch(cartActions.removeItem(item))
    }
    const handleViewCart = () => {
        dispatch(uiActions.toggleOpenDrawer('cart'))
        history.push('/cart');
    }
    const handleRemoveAllQty = (item) => {
        dispatch(cartActions.removeAllQtyItem(item));
    }
    const cartItems = cart.items.map((item, index) => {
        return <CartItem key={index}
            size={item.size}
            color={item.color}
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            amount={item.quantity}
            onAdd={handlerAddItem.bind(null, item)}
            onRemove={handlerRemoveItem.bind(null, item)}
            onRemoveAllItem={handleRemoveAllQty.bind(null, item)} />
    });
    return <div className="px-7 py-2">
        {cart.items.length > 0 ?
            <div>
                <ul className={classes['cart-items']}>
                    {cartItems}
                </ul>
                <div className={classes.total}>
                    <span>Total amount: </span>
                    <span>{priceTotal}</span>
                </div>
                <button className="bg-gray-200 w-full h-10 rounded-sm" onClick={handleViewCart}>View Cart</button>
            </div> :
            <div>
                <p className="border-gray-300 border border-dashed py-5 mt-7 text-center">Your cart is currently empty.</p>
                <button className="bg-black text-white py-3 w-full mt-5" onClick={() => { history.push('/category') }}>CONTINUE SHOPPING</button>
            </div>
        }
    </div>
}
export default Cart;