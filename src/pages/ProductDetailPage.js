import ProductDetail from "../components/Products/ProductDetail";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../components/Layout/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Layout/Breadcrumb/BreadcrumbItem";
import { useState } from "react";

const ProductDetailPage = () => {
    let history = useHistory();
    const params = useParams();
    const { id } = params;
    const [nameProduct, setNameProduct] = useState();

    return <div>
        <Breadcrumb title={nameProduct}>
            <BreadcrumbItem history={history} link="category" message="Category" />
            <BreadcrumbItem message={nameProduct} active={true} />
        </Breadcrumb>
        <div className="lg:pt-16 lg:mt-0  lg:rounded-none pt-6 relative -mt-5 rounded-t-2xl bg-white">
            <ProductDetail id={id} setNameProduct={setNameProduct} />
        </div>
    </div>
}
export default ProductDetailPage;