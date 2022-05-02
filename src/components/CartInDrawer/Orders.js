import Card from '../UI/Card';
import { useEffect, useState } from 'react';


const Orders = () => {
    const [listOrders, setListOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorHttp, setErrorHttp] = useState('')
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://crwn-clothing-52d58.firebaseio.com/orders.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            setListOrders(responseData);
            setIsLoading(false);
        }
        fetchMeals().catch(err => {
            setIsLoading(false);
            setErrorHttp(err.message);
        })
    }, []);

    let list = <h2>No meal found!</h2>;

    if (Object.keys(listOrders).length !== 0) {
        let arr = []
        for (const [key, value] of Object.entries(listOrders)) {
            arr.push(
                <div key={key}>
                    <div>{key}</div>
                    {
                        value.orderedItems.map(i => {
                            return <div key={`${key}+${i.id}`}>
                                {i.name}
                            </div>
                        })
                    }
                </div>
            )

        }
        return <Card> {arr} </Card>;
    }
    let content = list;

    if (errorHttp) {
        content = <div>Loading failed....</div>
    }
    if (isLoading) {
        content = <div>Loading....</div>
    }
    return <section >
        <Card>

            {content}

        </Card>
    </section>
}
export default Orders;