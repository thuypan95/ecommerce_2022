import Rating from 'react-rating';
import { StarBorderRounded, StarRounded } from "@material-ui/icons";
const RatingReview = (props) => {
    const { handleChangeRating, valueRating, readonly } = props;

    return <Rating
        readonly={readonly}
        initialRating={valueRating}
        onChange={handleChangeRating}
        fullSymbol={<StarRounded fontSize="large" style={{ fill: '#FDCC0D' }} />}
        emptySymbol={<StarBorderRounded fontSize="large" style={{ fill: '#FDCC0D' }} />}
    />
}
export default RatingReview;