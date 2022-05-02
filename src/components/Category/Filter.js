import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, domainColors, domainSizes } from "../../api";
import { fetchCategory } from "../../redux/product-actions";
import FilterByCategories from "./FilterByCategories";
import FilterByColors from "./FilterByColors";
import FilterByPrice from "./FilterByPrice";
import FilterBySizes from "./FilterBySizes";
const Filter = () => {
    const dispatch = useDispatch();
    const listCat = useSelector(state => state.product.listCategory);
    const [listColors, setListColors] = useState([]);
    const [listSizes, setListSizes] = useState([]);
    const fetchListColor = async () => {
        await axios.get(baseURL + domainColors).then(response => {
            const data = response.data;
            setListColors(data);
        })
            .catch(error => {
                console.log(error);
            })
    }
    const fetchListSizes = async () => {
        await axios.get(baseURL + domainSizes).then(response => {
            const data = response.data;
            setListSizes(data);
        })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);
    useEffect(() => {
        fetchListColor();
        fetchListSizes();
    }, []);

    return <div className="lg:w-1/4 lg:mr-4 w-full p-6 lg:p-0">
        {listCat.length > 0 && <FilterByCategories listCat={listCat} />}
        <div className="h-8" />
        {listColors.length > 0 && <FilterByColors listColors={listColors} />}
        <div className="h-8" />
        {listSizes.length > 0 && <FilterBySizes listSizes={listSizes} />}
        <div className="h-8" />
        <FilterByPrice />
    </div>
}
export default Filter;