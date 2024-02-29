import { useContext, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../helpers/AuthRequest";
import { UserContext } from "../context/UserContext";

const Login = () => {

    const navigator = useNavigate();
    const { loginSession } = useContext(UserContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = (e) => {
        e.preventDefault();

        if (validate()) {
            const user = { login: login, password: password };
            setErrorMessage('');
            loginRequest(user).then(Response => {
                if (Response.status === 200) {
                    console.log(Response.headers)
                    const token = Response.headers.authorization;
                    loginSession(token);
                    navigator('/main/profile');
                }
            })
        }
    }

    const validate = () => {
        if (login.length < 3 || password.length < 4) {
            setErrorMessage('Login or password is too short!');
            return false;
        }

        if (!password.match(/^[a-zA-Z0-9]+$/) || !login.match(/^[a-zA-Z0-9]+$/)) {
            setErrorMessage('Don\'t use special symbols in login or password!');
            return false;
        }

        return true;
    }

    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="max-w-xl mx-auto px-10 py-16 shadow-md text-left">
                <h2 className="font-bold text-2xl mb-5 text-indigo-950">Sign In</h2>
                <form onSubmit={loginUser} className="flex flex-col mb-6">
                    <label className="mb-2 text-md text-slate-800" htmlFor="login">Login</label>
                    <input onChange={(e) => {setLogin(e.target.value)}} className="shadow-md mb-4 bg-slate-100 py-1 px-2" type="text" name="login" id="login" />
                    <label className="mb-2 text-md text-slate-800" htmlFor="password">Password</label>
                    <input onChange={(e) => {setPassword(e.target.value)}} className="shadow-md mb-6 bg-slate-100 py-1 px-2" type="password" name="password" id="password" />
                    {errorMessage && <p className="py-1 px-2 bg-red-200 text-red-700 mb-4 shadow-md"><IoWarningOutline className="inline -translate-y-0.5 mr-2"/>{errorMessage}</p>}
                    <button className="shadow-md bg-indigo-700 py-1 text-gray-200 font-semibold" type="submit">Log In</button>
                </form>
                <p className="text-center ">No account? <a className="text-blue-400 underline" href="/auth/register">Sign Up</a></p>
            </div>
        </div>
    )
}

export default Login;