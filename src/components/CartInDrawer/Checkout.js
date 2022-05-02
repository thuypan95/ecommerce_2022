import classes from './Checkout.module.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required(),
    street: yup.string().required(),
});
const Checkout = (props) => {
    const { register, handleSubmit, trigger, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const confirmHandler = (event) => {
        props.submitConfirm(event);
    };
    // const onNameChange = async (value) => {
    //     const valid = await trigger("name");
    //      console.log("valid", valid, "value", value);
    //     if (!valid) {
    //         // @todo: bug here? valid only correct after submitting
    //         return;
    //     }

    // };
    return (
        <form className={classes.form} onSubmit={handleSubmit(confirmHandler)}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <input
                            className={errors.name ? classes['input-error'] : ''}
                            {...field}
                            onChange={({ target: { value } }) => {
                                onChange(value);
                                trigger("name")
                            }}
                        />
                    )}
                />
                {/* <input type='text' id='name' {...register("name")} /> */}
                <p className={classes.error}>{errors.name?.message}</p>
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <Controller
                    name="street"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <input
                            className={errors.street ? classes['input-error'] : ''}

                            {...field}
                            onChange={({ target: { value } }) => {
                                onChange(value);
                                trigger("street")
                            }}
                        />
                    )}
                />
                <p className={classes.error}>{errors.street?.message}</p>
            </div>
            <div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' {...register("postal")} />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' {...register("city")} />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    );

}
export default Checkout;