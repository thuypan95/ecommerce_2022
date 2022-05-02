import { Check } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../../redux/product-slice";

const FilterByColors = (props) => {
    const dispatch = useDispatch();
    const [checkedState, setCheckedState] = useState(
        new Array(props.listColors.length).fill(false)
    );

    const handleChangeInput = (target, position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        console.log("updatedCheckedState", checkedState)
        setCheckedState(updatedCheckedState);


        dispatch(productActions.inputChangeColor(target.value))
    }

    return <div>
        <h2 className="font-semibold mb-4">Colors</h2>
        <div className="flex">
            {
                props.listColors.length > 0 &&
                props.listColors.map((color, index) => (<div key={color.id} className="mr-2">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            name={color.name}
                            value={color.id}
                            onChange={(event) => handleChangeInput(event.target, index)}
                            className="hidden"
                            type="checkbox" />
                        <span className="w-8 h-8 text-center rounded-full border" style={{ backgroundColor: `${color.color_code}` }}>
                            {checkedState[index] && <Check style={{ fill: "green" }} size="small" />}
                        </span>
                    </label>
                </div>))
            }
        </div>
    </div>
}
export default FilterByColors;