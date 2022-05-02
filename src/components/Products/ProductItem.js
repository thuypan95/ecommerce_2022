import { useState } from 'react';
//import { ShoppingCartOutlined } from "@material-ui/icons";
//import { useDispatch } from 'react-redux';
//import { cartActions } from '../../store/cart-slice';
import LazyloadImg from '../UI/LazyLoadingImage';
import { baseURL } from '../../api';
import { useHistory, withRouter } from 'react-router-dom';
import { checkDeviceType } from '../../functions';
import config from '../../config';

const ProductItem = (props) => {
    const device = checkDeviceType();
    const [isHover, setIsHover] = useState(false);
    const [image, setImage] = useState(props.imgUrl[0].url);
    let history = useHistory();
    const handleViewDetail = () => {
        history.push('/product/' + props.id);
        props.handleDelete();
    }
    //const dispatch = useDispatch();
    // const handlerAddToCart = () => {
    //     dispatch(cartActions.addItem({ ...props.item, quantity: 1 }));
    // }
    const handleMouseEnter = () => {
        if (device === config.isDesktop) {
            if (props.imgUrl[1]) {
                setImage(props.imgUrl[1].url)
                setIsHover(true);
            }
        }
    }
    const handleMouseLeave = () => {
        if (device === config.isDesktop) {
            setImage(props.imgUrl[0].url)
            setIsHover(false);
        }
    }
    // const classAction =
    //     `absolute bg-white shadow-lg transition ease-in duration-200 absolute transform -translate-x-2/4 bottom-5 left-2/4 p-2 rounded-full flex items-center justify-center cursor-pointer w-40 h-10 ${isHover ? 'opacity-100' : 'opacity-0'}`;

    return <div className="product-item cursor-pointer "
        onClick={handleViewDetail}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} >
        <div className="relative overflow-hidden">
            <LazyloadImg url={baseURL + image} isHover={isHover} />
            {/* <img src={props.imgUrl} alt={props.name} /> */}
            {/* <div className={classAction} onClick={handlerAddToCart}>
                <ShoppingCartOutlined fontSize="small" />
                <span className="rounded-full ml-2" >Add To Cart</span>
            </div> */}
        </div>
        <div className="product-info text-center mt-4">
            <h4 className="font-light text-xs md:text-sm truncate">{props.name}</h4>
            {
                device !== 'mobile' && <p className="text-xs font-thin mt-1">
                    {
                        props.categories.length > 0 ?
                            props.categories.map((c, index) => {
                                return <span key={c.id}>{c.name}{index + 1 - props.categories.length === 0 ? '' : ','} </span>
                            }) : ''
                    }
                </p>
            }

            <p className="font-bold text-green-600 mt-1">${props.price}</p>
        </div>
    </div>
}
export default withRouter(ProductItem);