import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";
import Orders from "../components/MyOrders/Orders"

const MyOrdersPage = () => {
    return <>
        <Breadcrumb title="My Orders">
            <BreadcrumbItem message="My Orders" active={true} />
        </Breadcrumb>
        <div className="lg:container lg:py-16 lg:px-0 lg:mt-0 px-3 py-4 relative -mt-5 rounded-t-2xl lg:rounded-none bg-white">
            <Orders />
        </div>
    </>
}
export default MyOrdersPage;