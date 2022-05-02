import { useDispatch } from "react-redux";
import { productActions } from "../../redux/product-slice";

const FilterByCategories = (props) => {
    const dispatch = useDispatch();
    const handleChangeInput = (target) => {
        dispatch(productActions.inputChangeCategory(target.value))
    }

    return <div>
        <h2 className="font-semibold mb-4">Categories</h2>
        {
            props.listCat.length > 0 &&
            props.listCat.map(cat => (<div key={cat.id}>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        name={cat.name}
                        value={cat.id}
                        onChange={(event) => handleChangeInput(event.target)}
                        className="text-indigo-500 w-4 h-4 mr-2 focus:ring-indigo-400 focus:ring-opacity-25 border border-gray-300 rounded" type="checkbox" />
                    {cat.name}
                </label>


            </div>))
        }
    </div>
}
export default FilterByCategories;