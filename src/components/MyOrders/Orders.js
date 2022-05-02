import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { baseURL, domainOrders } from "../../api";
import { authHeader } from "../../functions";
import OrderDetail from "./OrderDetail";
import OrderItem from "./OrderItem";
import LoadingList from "../UI/LoadingList";
const Orders = () => {
    const arrayTitleTable = ['Number', 'Order', 'Price', 'Status', 'Created at'];
    const [listOrder, setListOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const [active, setActive] = useState();
    const history = useHistory();
    useEffect(() => {
        const fetchListOrder = () => {
            setIsLoading(true);
            axios.get(baseURL + domainOrders, authHeader())
                .then((response) => {
                    if (response.data) {
                        setListOrder(response.data);
                        setActive(response.data[0].id)
                        getDetail(response.data[0].id);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    // handle error
                    console.log(error);
                })
        };
        fetchListOrder();

    }, []);
    const getDetail = (id) => {
        axios.get(`${baseURL + domainOrders}/${id}`, authHeader())
            .then((response) => {
                if (response.data) {
                    setDetail(response.data);
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }
    const handleDetail = (id) => {
        getDetail(id);
        setActive(id);
    }
    if (isLoading) {
        return <LoadingList />
    }
    return <div className="lg:flex lg:items-start">
        <table className="auto lg:w-2/3 w-full">
            <thead className="border-b h-8">
                <tr >
                    {
                        arrayTitleTable.map((item, index) => (
                            <th key={index} className={`w-1/5 text-left pb-3 font-semibold text-gray-400 ${index === 0 && 'pl-3'}`}>{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    listOrder.length > 0 ? listOrder.map(({ ...otherSectionProps }) => (
                        <OrderItem key={otherSectionProps.id} {...otherSectionProps} handleClick={handleDetail.bind(null, otherSectionProps.id)} active={active} />
                    )) :
                        <tr>
                            <td colSpan="5" className="text-center p-3.5 text-gray-400">Your order is currently empty.
                                <span className="text-blue-500 underline cursor-pointer ml-2" onClick={() => history.push('/category')}>Shopping now</span></td>
                        </tr>
                }
            </tbody>
        </table>
        {
            Object.keys(detail).length !== 0 && <OrderDetail detail={detail} />
        }
    </div>
}
export default Orders;