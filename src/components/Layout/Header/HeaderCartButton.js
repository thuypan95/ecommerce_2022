import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from "@material-ui/icons";
import classes from './HeaderCartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../redux/ui-slice';

const HeaderCartButton = () => {
    const dispatch = useDispatch();
    const [isBump, setIsBump] = useState(false);
    const cart = useSelector(state => state.cart);
    const items = cart.items;
    const countItem = cart.totalQty;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsBump(true);
        const timer = setTimeout(() => {
            setIsBump(false);
        }, 300);
        return (() => {
            clearTimeout(timer);
        })
    }, [cart, items.length]);
    return <span onClick={() => dispatch(uiActions.toggleOpenDrawer('cart'))}>

        <ShoppingCartOutlined fontSize="large" />
        <span className={`font-light text-sm bg-gray-200 w-5 h-5 inline-block text-center rounded-full ${isBump ? classes.bump : ''}`} > {countItem}</span>
    </span>


}
export default HeaderCartButton;