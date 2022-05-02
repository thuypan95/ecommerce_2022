import SlideHome from "../components/Home/SlideHome";
import CollectionHome from "../components/Home/CollectionHome";
import TrendingProductList from "../components/Products/TrendingProductList"

const HomePage = () => {

    return (
        <div>
            <SlideHome />
            <TrendingProductList />
            <CollectionHome />
        </div>
    )
}
export default HomePage;