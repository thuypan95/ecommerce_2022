import LoadingList from "../UI/LoadingList";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";

const RelatedProduct = (props) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: true,
        centerPadding: 30,
        lazyLoad: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }]
    };

    return <div className="container px-3 md:px-0 md:py-16 py-8">
        {props.isLoadingRelated ? <LoadingList /> :
            props.listProductRelated.length > 0 &&
            <div className="fade-in-text  product-list">
                <h2 className="text-center font-bold md:text-2xl mb-4">Related Products</h2>
                <Slider {...settings}>
                    {
                        props.listProductRelated.map(i => {
                            return <ProductItem handleDelete={() => { }} key={i.id} id={i.id} name={i.name} price={i.price} imgUrl={i.images} categories={i.categories} item={i} />
                        })
                    }
                </Slider>
            </div>}
    </div>
}
export default withRouter(RelatedProduct);