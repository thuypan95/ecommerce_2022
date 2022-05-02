import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL, domainProduct } from "../../api";
import LoadingList from "../UI/LoadingList";
import ProductItem from "../Products/ProductItem";
import ReactPaginate from 'react-paginate';
import qs from 'qs';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/product-slice";
import { useLocation } from "react-router-dom";

const ListProduct = () => {
    const queryLocation = useLocation().search;
    const searchText = new URLSearchParams(queryLocation).get('search');

    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const filterCategory = useSelector(state => state.product.filterCat);
    const filterColor = useSelector(state => state.product.filterColor);
    const filterSize = useSelector(state => state.product.filterSize);
    const filterPriceStart = useSelector(state => state.product.filterPriceStart);
    const filterPriceEnd = useSelector(state => state.product.filterPriceEnd);
    const limit = 8;
    const query = qs.stringify({ categories: filterCategory, colors: filterColor, sizes: filterSize, price_lte: filterPriceEnd, price_gte: filterPriceStart, name_containss: searchText });
    const dispatch = useDispatch();
    useEffect(() => {
        const countListProduct = async () => {
            setIsLoading(true);

            await axios.get(`${baseURL + domainProduct}/count?${query}`)
                .then(response => {
                    const data = response.data;
                    setPageCount(Math.ceil(data / limit));
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                })
        };
        countListProduct();
    }, [query]);
    const listProduct = async () => {
        setIsLoading(true);
        await axios.get(`${baseURL + domainProduct}/?${query}&_start=${offset}&_limit=${limit}`)
            .then(response => {
                const data = response.data;
                setList(data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            })
    };
    useEffect(() => {
        listProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, query]);
    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setOffset(offset);
        listProduct();
    }

    return (<div className="w-full lg:w-3/4 py-3">
        {
            isLoading ? <LoadingList /> :
                list.length > 0 ?
                    <div>
                        <div className="flex flex-wrap">
                            {
                                list.map(i => (
                                    <div className="w-1/2 md:w-1/4 p-2 mb-2" key={i.id}>
                                        <ProductItem handleDelete={() => { dispatch(productActions.deleteFilter()) }} id={i.id} name={i.name} price={i.price} imgUrl={i.images} categories={i.categories} item={i} />
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    : <p className="text-center">No items</p>
        }
        {
            list.length > 0 && <ReactPaginate
                previousLabel={'Previous'}
                previousClassName={'mr-4'}
                nextClassName={'ml-4'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                pageClassName={'h-8 w-8 flex items-center justify-center rounded-sm'}
                onPageChange={handlePageClick}
                containerClassName={'flex justify-center items-center'}
                activeClassName={'bg-green-600 text-white'}
            />
        }

    </div>)
}
export default ListProduct;