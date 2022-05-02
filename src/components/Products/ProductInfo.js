import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Check } from "@material-ui/icons";
const ProductInfo = (props) => {
    return <div className="md:flex lg:container px-3 lg:px-0">
        <div className="md:w-1/2 md:mr-16 lg:pr-16">
            <Slider {...props.settings}>
                {props.images.map((img, index) => {
                    return <div key={index} onClick={() => props.setIsOpenLightBox(true)}>
                        <img src={img} alt="" />
                    </div>
                })}
            </Slider>
            {/* <div className="w-40 mr-5">
        {images.map((img, index) => {
            return <div onClick={() => { setImageIndex(index) }} key={index} className={`cursor-pointer mb-2 ${imgIndex === index && 'border border-green-600 p-px'}`}>
                <LazyLoadingImage url={img} />
            </div>
        })}
    </div>
    <div onClick={() => setIsOpenLightBox(true)}>
        <LazyLoadingImage url={images[imgIndex]} />
    </div> */}
        </div>
        {props.isOpenLightBox && (
            <Lightbox
                mainSrc={props.images[props.imgIndex]}
                nextSrc={props.images[(props.imgIndex + 1) % props.images.length]}
                prevSrc={props.images[(props.imgIndex + props.images.length - 1) % props.images.length]}
                onCloseRequest={() => props.setIsOpenLightBox(false)}
                onMovePrevRequest={() =>
                    props.setImageIndex((props.imgIndex + props.images.length - 1) % props.images.length)
                }
                onMoveNextRequest={() =>
                    props.setImageIndex((props.imgIndex + 1) % props.images.length)
                }
            />
        )}
        {Object.keys(props.detail).length !== 0 && <div className="md:w-1/2">
            <h2 className="font-medium capitalize mb-5 mt-5 md:mt-0">{props.detail.name}</h2>
            <p className="font-black text-green-600 text-3xl mb-5">${props.detail.price}</p>
            <p className="font-light border-b pb-4">{props.detail.short_description}</p>
            <p className="mt-4 font-medium">Availble Options</p>
            {
                props.detail.colors.length > 0 &&
                <div>
                    <p className="mb-1 mt-4">Colors: {props.selectColor.name}</p>
                    <div className="flex">
                        {props.detail.colors.map(color => {
                            return <div key={color.id}
                                onClick={props.handleSelectColor.bind(null, color)}
                                className="w-8 h-8 text-center border rounded-full border-gray mr-2 cursor-pointer "
                                style={{ backgroundColor: `${color.color_code}` }}>
                                {
                                    props.selectColor.id === color.id && <Check style={{ fill: "green" }} size="small" />
                                }
                            </div>
                        })}
                    </div>
                </div>
            }
            {props.errors.errColor && <p className="mt-2 text-red-600 ">{props.errors.errColor}</p>}

            {
                props.detail.sizes.length > 0 && <div>
                    <p className="mb-1 mt-4">Sizes</p>
                    <div className="flex">
                        {props.detail.sizes.map(size => {
                            return <div key={size.id}
                                onClick={props.handleSelectSize.bind(null, size)}
                                className={`w-14 h-7 border rounded-full text-center  border-black mr-2 cursor-pointer transition ease-in-out duration-500 hover:bg-black hover:text-white
                         ${props.selectSize.id === size.id ? 'bg-black text-white' : 'text-gray-500'}`}>{size.name}</div>
                        })}
                    </div>
                </div>

            }
            {props.errors.errSize && <p className="mt-2 text-red-600 ">{props.errors.errSize}</p>}

            <div className="mt-6 flex items-center">
                <label>Quantity</label>
                <input type="number" pattern="\d*" className="border h-10 w-24 rounded-md ml-4 outline-none px-4" ref={props.inputRef} defaultValue={1} min={1} />
                <button className="bg-green-600 h-10 rounded-md ml-4 flex-grow text-white" onClick={props.handleAddToCart}>Add to cart</button>
            </div>
            {props.errors.errQty && <p className="mt-2 text-red-600 ">{props.errors.errQty}</p>}
            {/* <button className="mt-4" onClick={handleAddWishlist}><Favorite style={{ fill: '#DC2626' }} /> ADD TO WISHLIST</button> */}
        </div>}
    </div>
}
export default ProductInfo;