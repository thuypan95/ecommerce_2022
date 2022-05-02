
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/auth-slice";
import { Toast } from "../../functions";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
});
const FormLogin = () => {
    const history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { handleSubmit, trigger, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.loading);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const confirmHandler = async (event) => {
        const result = await dispatch(login(event));
        if (result.error) {
            if (result.error.message) {
                setError(result.error.message)
            }
        }
        else if (result.meta.requestStatus === 'fulfilled') {
            Toast.success('Sign in success');
            history.replace(from);
        }
    };
    return <div className="md:w-2/4 w-full m-auto">
        <h2 className="text-2xl tracking-wider	">SIGN IN</h2>
        <form className="mt-4" onSubmit={handleSubmit(confirmHandler)}>
            {error && <p className="my-5 text-red-600 text-center">{error}</p>}
            <div>
                <label htmlFor='email'>Email or Username <span className="text-red-600"> *</span></label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <input
                            className={`border h-10 rounded-sm outline-none px-4 w-full mt-2  ${errors.email ? 'bg-red-50 border-red-500' : 'focus:border-green-600'}`}
                            {...field}
                            onChange={({ target: { value } }) => {
                                onChange(value);
                                trigger("email")
                            }}
                        />
                    )}
                />
                {
                    errors.email && <p className="text-red-600 mt-2">{errors.email.message}</p>
                }
            </div>
            <div className="mt-5">
                <label htmlFor='password'>Password <span className="text-red-600"> *</span></label>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <div className="relative mt-2">
                            <input
                                type={`${showPass ? 'text' : 'password'}`}
                                className={`border h-10 rounded-sm outline-none px-4 w-full  focus:border-green-600 ${errors.password ? 'bg-red-50 border-red-500' : 'focus:border-green-600'}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("password")
                                }}
                            />
                            <button
                                onClick={() => { setShowPass(!showPass) }}
                                className="absolute right-1 top-1.5" type="button">
                                {showPass ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>
                    )}
                />
                {
                    errors.password && <p className="text-red-600 mt-2">{errors.password.message}</p>
                }
            </div>
            <div className="flex justify-between mt-4">
                <p className="text-xs md:text-sm text-gray-500">If you do not already have an account, please &nbsp;
                    <span className="text-blue-400 cursor-pointer hover:underline"
                        onClick={() => { history.push('/register') }}>Register here</span>
                </p>
                <span className="text-xs md:text-sm text-right text-blue-400 cursor-pointer hover:underline"
                    onClick={() => { history.push('/register') }}>Forgot password?</span>
            </div>
            <div className="mt-6">
                {
                    isLoading ?
                        <button
                            className="transition duration-500 ease-in-out hover:bg-white hover:text-black border-2 border-black bg-black py-2 px-10 text-white rounded-sm"
                            type="button">
                            Loading...
                        </button> :
                        <button
                            className="transition duration-500 ease-in-out hover:bg-white hover:text-black border-2 border-black bg-black py-2 px-10 text-white rounded-sm"
                            type="submit">
                            SIGN IN
                        </button>
                }
            </div>
        </form>
    </div>
}
export default FormLogin;