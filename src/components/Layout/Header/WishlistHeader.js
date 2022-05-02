import { FavoriteBorder } from "@material-ui/icons";
import { useSelector } from "react-redux";

const WishlistHeader = () => {
    const wishlist = useSelector(state => state.wishlist);
    return <span className="mr-5"><FavoriteBorder fontSize="large" />
        <span className="font-light text-sm bg-gray-200 w-5 h-5 inline-block text-center rounded-full">{wishlist.count}</span>
    </span>
}
export default WishlistHeader;