import Breadcrumb from '../components/Layout/Breadcrumb/Breadcrumb';
import CartDetail from '../components/Cart/CartDetail';
import BreadcrumbItem from '../components/Layout/Breadcrumb/BreadcrumbItem';
const CartPage = () => {
    return <div>
        <Breadcrumb title="Shopping cart">
            <BreadcrumbItem message="Shopping cart" active={true} />
        </Breadcrumb>
        <div className="lg:container lg:py-16 lg:px-0 lg:mt-0 px-3 py-4 relative -mt-5 rounded-t-2xl lg:rounded-none bg-white">
            <CartDetail />
        </div>
    </div>
}
export default CartPage;