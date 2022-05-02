
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import slide_1 from "../../assets/slideshow-1.jpeg";
import slide_2 from "../../assets/slideshow-2.jpeg";
const SlideHome = () => {


    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };
    return (

        <div className="w-full px-3 lg:px-0">
            <Slider {...settings}>
                <img src={slide_1} className="rounded-xl lg:rounded-none" alt="" />
                <img src={slide_2} className="rounded-xl lg:rounded-none" alt="" />

            </Slider>
        </div>
    )
}
export default SlideHome;