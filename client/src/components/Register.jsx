import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { registerRequest } from "../helpers/AuthRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigator = useNavigate();

    const [login, setLogin] = useState('');
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [proffession, setProffession] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const registerUser = (e) => {
        e.preventDefault();

        if (validate()) {
            const user = { login: login, password: password, email: email, fullName: fullName, age: age, country: country, city: city, proffession: proffession };
            setErrorMessage('');
            registerRequest(user).then(Response => {
                if (Response.status === 200) {
                    navigator('/auth/login');
                }
            })
        }
    }

    const validate = () => {
        if (password !== repeatPassword) {
            setErrorMessage('Passwords doesn\'t match!');
            return false;
        }

        if (!password || !login || !fullName || !age || !country || !city || !proffession || !email) {
            setErrorMessage('Please fill all fields!');
            return false;
        }

        if (login.length < 3 || password.length < 4) {
            setErrorMessage('Login or password is too short!');
            return false;
        }

        if (!password.match(/^[a-zA-Z0-9]+$/) || !login.match(/^[a-zA-Z0-9]+$/)) {
            setErrorMessage('Do not use the special symbols in your login or password!');
            return false;
        }

        return true;
    }


    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md text-left">
                <h2 className="font-bold text-2xl mb-5 text-indigo-950">Sign Up</h2>
                <form onSubmit={registerUser} className="flex flex-col">
                    <label className="mb-2 text-md text-slate-800" htmlFor="input">Login</label>
                    <input onChange={(e) => {setLogin(e.target.value)}} className="shadow-md mb-4 bg-slate-100 py-1 px-2 " type="text" name="login" id="login" />
                    <label className="mb-2 text-md text-slate-800" htmlFor="email">Email</label>
                    <input onChange={(e) => {setEmail(e.target.value)}} className="shadow-md mb-4 bg-slate-100 py-1 px-2"  type="email" name="email" id="email" />
                    <label className="mb-2 text-md text-slate-800" htmlFor="fullName">Full Name</label>
                    <input onChange={(e) => {setFullname(e.target.value)}} className="shadow-md mb-4 bg-slate-100 py-1 px-2 " type="text" name="fullName" id="fullName" />
                    <div className="flex flex-nowrap items-center justify-between mb-4">
                        <div className="w-6/12 flex items-center">
                            <label className="mr-auto text-md text-slate-800" htmlFor="password">Password</label>
                            <input onChange={(e) => {setPassword(e.target.value)}} className="mr-auto shadow-md bg-slate-100 py-1 w-4/6" type="password" name="password" id="password" />
                        </div>
                        <div className="w-6/12 flex items-center">
                            <label className="text-md text-slate-800" htmlFor="password_repeat">Repeat</label>
                            <input onChange={(e) => {setRepeatPassword(e.target.value)}} className="ml-auto shadow-md bg-slate-100 py-1 w-9/12" type="password" name="password_repeat" id="password_repeat" />
                        </div>
                    </div>
                    <label className="mb-2 text-md text-slate-800" htmlFor="age">Age</label>
                    <input onChange={(e) => {setAge(e.target.value)}} className="shadow-md mb-4 bg-slate-100 py-1 px-2 " type="number" name="age" id="age" />
                    <div className="flex mb-4 lex flex-nowrap items-center justify-between">
                        <div className="w-6/12 flex items-center">
                            <label className="mr-auto text-md text-slate-800 w-3/12" htmlFor="country">Country</label>
                            <input onChange={(e) => {setCountry(e.target.value)}} className="mr-auto shadow-md bg-slate-100 w-4/6 py-1 px-2 " type="text" name="country" id="country" />
                        </div>
                        <div className="w-6/12 flex items-center">
                            <label className="ml-auto mr-auto text-md text-slate-800" htmlFor="city">City</label>
                            <input onChange={(e) => {setCity(e.target.value)}} className="shadow-md bg-slate-100 w-9/12 py-1 px-2 " type="text" name="city" id="city" />
                        </div>
                    </div>
                    <label className="mb-2 text-md text-slate-800" htmlFor="proffession">Proffession</label>
                    <input onChange={(e) => {setProffession(e.target.value)}} className="shadow-md mb-6 bg-slate-100 py-1 px-2 " type="text" name="proffession" id="proffession" />
                    {errorMessage && <p className="py-1 px-2 bg-red-200 text-red-700 mb-4 shadow-md"><IoWarningOutline className="inline -translate-y-0.5 mr-2"/>{errorMessage}</p>}
                    <button className="py-2 bg-indigo-800 text-gray-200 shadow-md font-semibold" type="submit">Register</button>
                </form>
                <div className="text-center mt-6">
                    <p>Already have an account? <a className="text-blue-400 underline" href="/auth/login">Sign In</a></p>
                </div>
            </div>
        </div>
    )
}

export default Register;