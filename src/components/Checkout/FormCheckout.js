import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { baseURL } from "../../api";
import { ArrowLeft } from "@material-ui/icons";
import { authHeader, Toast } from "../../functions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cart-slice";
import { socket } from "../../socket";

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    phoneNumber: yup.string().required(),
});
const FormAddress = (props) => {
    const note = useSelector(state => state.cart.note);
    const history = useHistory();
    const [stripeError, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const userID = useSelector(state => state.auth.id);
    const username = useSelector(state => state.auth.username)
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const { handleSubmit, trigger, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const confirmHandler = async (event) => {
        const cardElement = elements.getElement(CardElement);
        const token = await stripe.createToken(cardElement);
        if (token.token) {
            const valueShipping = {
                username: username,
                address: event.address,
                city: event.city,
                state: event.state,
                phone_number: event.phoneNumber,
                first_name: event.firstName,
                last_name: event.lastName
            };
            setLoading(true);
            socket.emit('addOrder', {
                amount: Number(props.cart.totalPrice),
                dishes: props.cart.items,
                info_shipping: valueShipping,
                token: token.token.id,
                note: note,
                user_id: userID
            },
                (response) => {
                    if (response.err) {
                        setLoading(false);
                        Toast.error(response.err);
                    }
                    else {
                        Toast.success('Order added successfully!');
                        const infoAddress = {
                            info_address: valueShipping
                        };
                        axios.put(`${baseURL}/users/${userID}`, infoAddress, authHeader()).then(() => {
                            setLoading(false);
                            Toast.success('Payment successfully!');
                            history.push('/my-orders');
                            dispatch(cartActions.clearAll());
                        })
                            .catch(err => {
                                setLoading(false);
                            })
                    }
                })
        }
        else if (token.error) {
            setError(token.error.message);
        }
    };
    return (
        <form className="md:w-1/2" onSubmit={handleSubmit(confirmHandler)}>
            <h2 className="font-bold md:text-2xl mb-4">Shipping Address</h2>
            <div className="flex mt-4">
                <div className="w-1/2 mr-3">
                    <label htmlFor='firstName'>First name</label>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.firstName && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("firstName")
                                }} />
                        )} />
                    {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
                </div>
                <div className="w-1/2">
                    <label htmlFor='lastName'>Last name</label>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.lastName && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("lastName")
                                }} />
                        )} />
                    {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
                </div>
            </div>
            <div className="mt-4 flex">
                <div className="w-1/2 mr-3">
                    <label htmlFor='phoneNumber'>Phone number</label>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.phoneNumber && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("phoneNumber")
                                }} />
                        )} />
                    {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
                </div>
                <div className="w-1/2">
                    <label htmlFor='address'>Address</label>
                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.address && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("address")
                                }} />
                        )} />
                    {errors.address && <p className="text-red-600">{errors.address.message}</p>}
                </div>
            </div>

            <div className="flex mt-4">
                <div className="w-1/2 mr-3">
                    <label htmlFor='city'>City</label>
                    <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.city && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("city")
                                }} />
                        )} />
                    {errors.city && <p className="text-red-600">{errors.city.message}</p>}
                </div>
                <div className="w-1/2">
                    <label htmlFor='state'>State</label>
                    <Controller
                        name="state"
                        control={control}
                        defaultValue=""
                        render={({ field: { value, onChange, ...field } }) => (
                            <input
                                className={`border rounded-md lg:rounded-none outline-none h-10 pl-4 w-full mt-2 ${errors.state && "border-red-600"}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("state")
                                }} />
                        )} />
                    {errors.state && <p className="text-red-600">{errors.state.message}</p>}
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor='card-element'>Credit or debit card</label>
                <div>
                    <CardElement
                        options={{
                            style: { width: "100%", base: { fontSize: "18px" } },
                        }} />
                    {stripeError && <p className="text-red-600 my-3">{stripeError}</p>}
                    <div id="card-errors" role="alert" />
                </div>
            </div>
            <div className="flex justify-between mt-4 md:mt-8">
                <button onClick={() => { props.history.push('/cart') }}
                    type='button'
                    className="h-10 bg-gray-100 px-4 rounded-sm">
                    <span className="mr-2"> <ArrowLeft /></span>  BACK
                </button>
                <button disabled={loading} className="h-10 bg-black text-white px-4 rounded-sm">
                    {loading ? 'Loading...' : 'PAYMENT'}
                </button>
            </div>
        </form>
    );
}
const FormCheckout = (props) => {
    const stripePromise = loadStripe("pk_test_RKigoTbUJRBhSYsoLGmKSLVy00yNI90pLd");
    return <Elements stripe={stripePromise}>
        <FormAddress cart={props.cart} tokenUser={props.tokenUser} history={props.history} />
        <style jsx="true" global="false">
            {`
                .StripeElement {
                display: block;
                background-color: #f8f9fa !important;
                margin-top: 8px;
                padding: 10px 8px;
                font-family: "Source Code Pro", monospace;
                box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                  rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                border: 0;
                outline: 0;
                border-radius: 0.375rem;
              }
              .StripeElement--focus {
                box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                  rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
                -webkit-transition: all 150ms ease;
                transition: all 150ms ease;
              }
        `}
        </style>
    </Elements>
}
export default FormCheckout;