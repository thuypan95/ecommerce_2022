
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ConfirmCheckout from "../components/Checkout/ConfirmCheckout";
import FormCheckout from "../components/Checkout/FormCheckout";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";

const CheckoutPage = () => {

    const tokenUser = useSelector(state => state.auth.token);
    const cart = useSelector(state => state.cart)
    const history = useHistory();
    useEffect(() => {
        if (cart?.items.length < 1) {
            history.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>
        <Breadcrumb title="Checkout">
            <BreadcrumbItem message="Checkout" active={true} />
        </Breadcrumb>
        <div className="lg:container lg:py-16 lg:px-0 lg:mt-0 px-3 py-4 relative -mt-5 rounded-t-2xl lg:rounded-none bg-white">
            <div className="md:flex">
                <FormCheckout tokenUser={tokenUser} cart={cart} history={history} />
                <ConfirmCheckout cart={cart} />
            </div>
        </div>
    </div>
}
export default CheckoutPage;