
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registration } from "../../redux/auth-slice";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password must match')
});
const FormRegister = () => {
    const { handleSubmit, trigger, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(state => state.auth.loading);
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);



    const confirmHandler = async (event) => {
        const result = await dispatch(registration(event));
        if (result.error) {
            if (result.error.message) {
                setError(result.error.message)
            }
        }
        else {
            history.push('/sign-in');
        }
    };

    return <div className="w-2/4 mr-auto ml-auto">
        <h2 className="text-2xl tracking-wider	">REGISTER</h2>

        <form className="mt-4" onSubmit={handleSubmit(confirmHandler)}>
            {error && <p className="my-5 text-red-600 text-center">{error}</p>}
            <div>
                <label htmlFor='email'>Email <span className="text-red-600"> *</span></label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <input
                            className={`border h-10 rounded-sm outline-none px-4 w-full mt-2 ${errors.email ? 'bg-red-50 border-red-500' : 'focus:border-green-600'}`}
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
                                className={`border h-10 rounded-sm outline-none px-4 w-full ${errors.password ? 'bg-red-50 border-red-500' : 'focus:border-green-600'}`}
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
            <div className="mt-5">
                <label htmlFor='password'>Confirm password <span className="text-red-600"> *</span></label>
                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field: { value, onChange, ...field } }) => (
                        <div className="relative mt-2">
                            <input
                                type={`${showConfirmPass ? 'text' : 'password'}`}
                                className={`border h-10 rounded-sm outline-none px-4 w-full ${errors.confirmPassword ? 'bg-red-50 border-red-500' : 'focus:border-green-600'}`}
                                {...field}
                                onChange={({ target: { value } }) => {
                                    onChange(value);
                                    trigger("confirmPassword")
                                }}
                            />
                            <button
                                onClick={() => { setShowConfirmPass(!showConfirmPass) }}
                                className="absolute right-1 top-1.5" type="button">
                                {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                            </button>
                        </div>
                    )}
                />
                {
                    errors.confirmPassword && <p className="text-red-600 mt-2">{errors.confirmPassword.message}</p>
                }
            </div>
            <p className="mt-4 text-sm text-gray-500">If you have an account, please &nbsp;
                <span className="text-blue-400 cursor-pointer hover:underline"
                    onClick={() => { history.push('/sign-in') }}>Sign in here</span>
            </p>
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
                            REGISTER
                        </button>
                }
            </div>
        </form>
    </div>
}
export default FormRegister;