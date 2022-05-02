import { useDispatch } from 'react-redux';
import ReactSlider from 'react-slider'
import { productActions } from '../../redux/product-slice';

const FilterByPrice = () => {
    const dispatch = useDispatch();
    return <div>
        <h2 className="font-semibold mb-4">Price</h2>

        <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={[0, 100]}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => <div {...props}>${state.valueNow.toFixed(2)}</div>}
            pearling
            minDistance={1}
            onAfterChange={(value, index) => { dispatch(productActions.changePrice({ start: value[0], end: value[1] })) }}

        />
    </div>

}
export default FilterByPrice;