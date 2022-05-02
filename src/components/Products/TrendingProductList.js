import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingList from "../UI/LoadingList";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, fetchProductDataByCategory } from "../../redux/product-actions";
const TrendingProductList = () => {
    const dispatch = useDispatch();
    const listCategories = useSelector(state => state.product.listCategory);
    const [active, setIsActive] = useState('');
    const listProduct = useSelector((state) => state.product.list);
    const isLoading = useSelector(state => state.ui.isLoading)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        centerPadding: 30,
        lazyLoad: true,
    };
    const settingsList = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }]

    };
    const settingsCategory = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }]
    };


    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);
    useEffect(() => {
        if (listCategories.length > 0) {
            setIsActive(listCategories[0].id)
            dispatch(fetchProductDataByCategory(listCategories[0].id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listCategories])
    const handleFetchProduct = (id) => {
        dispatch(fetchProductDataByCategory(id));
        setIsActive(id);
    };


    return <>
        <div className="w-full px-3 py-6 lg:hidden">
            <h2 className="text-center font-bold mb-4 ">TRENDING PRODUCTS</h2>
            <p className="text-center font-light m-auto text-gray-600 text-xs mb-8">Our latest endeavour features designs from around the world with materials so comfortable you won't want to wear anything else every again.
            </p>

            {isLoading ? <LoadingList /> :
                <div>
                    <div className="product-list">
                        <Slider {...settingsCategory}>
                            {
                                listCategories.length > 0 &&
                                listCategories.map(cat => {
                                    return <div className={`text-center rounded-full py-1 border text-sm ${active === cat.id ? 'border-green-600' : ''} `} key={cat.id}
                                        onClick={() => { handleFetchProduct(cat.id) }}>
                                        <div>{cat.name}</div>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>

                    <div className="fade-in-text mt-4 product-list">
                        {listProduct.length > 0 ?
                            <Slider {...settingsList}>
                                {
                                    listProduct.map(i => {
                                        return <ProductItem handleDelete={() => { }} key={i.id} id={i.id} name={i.name} price={i.price} imgUrl={i.images} categories={i.categories} item={i} />
                                    })
                                }
                            </Slider> : <p className="text-center">No items...</p>
                        }

                    </div>
                </div>}

        </div>
        <div className="container py-16 hidden lg:block">
            <h2 className="text-center font-bold text-2xl mb-4 ">TRENDING PRODUCTS</h2>
            <p className="text-center font-light w-2/4 m-auto text-gray-600 text-sm mb-8">Our latest endeavour features designs from around the world with materials so comfortable you won't want to wear anything else every again.
            </p>

            {isLoading ? <LoadingList /> :
                <div>
                    <div className="flex mb-10 justify-center">
                        {
                            listCategories.length > 0 &&
                            listCategories.map(cat => {
                                return <div className={`mr-2 w-48 text-center rounded-full py-2 border-green-600 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-100 ${active === cat.id && 'border'} `} key={cat.id}
                                    onClick={() => { handleFetchProduct(cat.id) }}>
                                    <div  >  {cat.name}</div>
                                </div>
                            })
                        }
                    </div>
                    <div className="fade-in-text  product-list">
                        {listProduct.length > 0 ?
                            <Slider {...settings}>
                                {
                                    listProduct.map(i => {
                                        return <ProductItem handleDelete={() => { }} key={i.id} id={i.id} name={i.name} price={i.price} imgUrl={i.images} categories={i.categories} item={i} />
                                    })
                                }
                            </Slider> : <p className="text-center">No items...</p>
                        }

                    </div>
                </div>}

        </div>
    </>
}
export default TrendingProductList;