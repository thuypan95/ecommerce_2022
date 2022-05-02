import { ArrowForward } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartActions } from "../../redux/cart-slice";
import Swal from 'sweetalert2';
import { checkDeviceType } from "../../functions";
import config from "../../config";
import CartItem from "./CartItem";
import CartItemMobile from "./CartItemMobile";
import { useState } from "react";

const CartDetail = () => {
    const isLogin = useSelector(state => state.auth.isLogin)
    const cart = useSelector(state => state.cart);
    const history = useHistory();
    const device = checkDeviceType();
    const [note, setNote] = useState();
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        dispatch(cartActions.addItem({ ...item, quantity: 1 }));
    }
    const handleRemoveItem = (item) => {
        if (item.quantity === 1) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(cartActions.removeItem(item));
                    Swal.fire(
                        'Deleted!',
                        'Your item has been deleted.',
                        'success'
                    )
                }
            })
        }
        else {
            dispatch(cartActions.removeItem(item));
        }
    }

    const handleRemoveAllQty = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cartActions.removeAllQtyItem(item));
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                )
            }
        })
    }
    const handleCheckout = () => {
        if (isLogin) {
            dispatch(cartActions.addNote(note));
            history.push('/checkout');
        }
        else {
            history.push('/sign-in?for=checkout');

        }

    }
    if (cart.items.length <= 0) {
        return <div className="text-center ">
            <p className="font-semibold text-2xl mb-4">Your Cart Is Currently Empty. </p>
            <p className="text-gray-400 text-sm">Before proceeding to checkout you must add some products to your shopping cart.</p>
            <p className="text-gray-400 text-sm">You will find a lot of interesting products on our "Shop" page.</p>
            <button className="bg-black text-white py-3 px-10 mt-4" onClick={() => { history.push('/category') }}>CONTINUE SHOPPING</button>
        </div>
    }
    return <div className="lg:flex">
        {device !== config.isMobile ?
            <table className="table-auto lg:w-2/3 w-full">
                <thead className="bg-gray-100 border">
                    <tr >
                        <th className="text-left h-12 pl-4" >Product</th>
                        <th className="w-32 text-left">Price</th>
                        <th className="w-32 text-left">Qty</th>
                        <th className="w-32 text-left">Total</th>
                        <th className="w-12" />
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item, index) => {
                        return <CartItem
                            key={index}
                            item={item}
                            history={history}
                            handleAddItem={handleAddItem}
                            handleRemoveItem={handleRemoveItem}
                            handleRemoveAllQty={handleRemoveAllQty} />
                    })}
                </tbody>
            </table>
            : <div>
                {cart.items.map((item, index) => {
                    return <CartItemMobile
                        key={index}
                        item={item}
                        history={history}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                        handleRemoveAllQty={handleRemoveAllQty} />

                })}
            </div>
        }
        <div className="lg:w-1/3 lg:ml-5 mt-4 lg:mt-0">
            <div className="h-12 flex items-center pl-4 font-medium text-sm border">THERE ARE {cart.totalQty} ITEMS IN YOUR CART
            </div>
            <div className="bg-gray-100 p-3.5">
                <div className="flex justify-between items-center">
                    <span className="font-bold">TOTAL:</span>
                    <span className="font-bold text-2xl">${(cart.totalPrice).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <span className="font-bold">SHIPPING:</span>
                    <span className="text-xs text-gray-400 font-light">Shipping & taxes calculated at checkout
                    </span>
                </div>
                <div className="mt-6">
                    <p className="font-bold">SPEND <span className="text-green-600">
                        ${(400 - cart.totalPrice).toFixed(2)} </span>FOR FREE SHIPPING</p>
                    <p className="text-xs text-gray-400 font-light"> Free shipping for any orders above
                        <span className="text-green-600 font-bold text-lg"> $400.00</span>
                    </p>
                </div>
                <div className="mt-6">
                    <p className="font-bold text-sm  mb-3">ADD A NOTE TO YOUR ORDER :</p>
                    <textarea type="textarea" className="border w-full outline-none p-3" rows="4"
                        onChange={(event) => setNote(event.target.value)} />
                </div>
                <button className="bg-gray-300 h-12 rounded-sm w-full mt-4">CONTINUE SHOPPING</button>
                <button className="bg-red-700 text-white h-12 rounded-sm w-full mt-4 flex items-center justify-center transition duration-300 ease-linear hover:bg-red-800"
                    onClick={handleCheckout}>
                    CHECKOUT
                    <span className="ml-5"> <ArrowForward /></span>
                </button>
            </div>
        </div>
    </div>
}
export default CartDetail;