import { useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/product-slice";

const FilterBySizes = (props) => {
    const dispatch = useDispatch();
    const [checkedState, setCheckedState] = useState(
        new Array(props.listSizes.length).fill(false)
    );

    const handleChangeInput = (target, position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        console.log("updatedCheckedState", checkedState)
        setCheckedState(updatedCheckedState);


        dispatch(productActions.inputChangeSize(target.value))
    }

    return <div>
        <h2 className="font-semibold mb-4">Sizes</h2>
        <div className="flex">
            {
                props.listSizes.length > 0 &&
                props.listSizes.map((size, index) => (<div key={size.id} className="mr-2">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            name={size.name}
                            value={size.id}
                            onChange={(event) => handleChangeInput(event.target, index)}
                            className="hidden"
                            type="checkbox" />
                        <span className={`w-8 h-8 text-sm border border-black flex items-center justify-center ${checkedState[index] && 'bg-black text-white'}`}>
                            {size.name}
                        </span>
                    </label>
                </div>))
            }
        </div>
    </div>
}
export default FilterBySizes;