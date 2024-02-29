import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {

    const navigator = useNavigate();

    const { cleanSession, token, isAdmin, id } = useContext(UserContext);
    const path = `/main/user/${id}`;

    const logOut = () => {
        cleanSession();
        navigator('/auth/login');
    }

    isAdmin();

    return (
        <header className="p-4 bg-indigo-950 mb-10 shadow-md">
            <div className="container max-w-screen-xl mx-auto ">
                <div className="max-w-xl mx-auto flex flex-nowrap items-center justify-between">
                    <nav>
                        <ul className="flex flex-row text-gray-200">
                            <li>
                                <a href="/main/jobs" className="font-bold py-1 px-2">Jobs</a>
                            </li>
                            {token && <li><a href={path} className="font-bold py-1 px-2">Profile</a></li>}
                            {isAdmin() && (
                                <li><a href="/admin/adminpanel" className="font-bold py-1 px-2">Admin Panel</a></li>
                            )}
                        </ul>
                    </nav>
                    <div className="flex flex-row">
                        {token ? "" : <a href="/auth/login" className="px-2 py-1 bg-indigo-500 font-semibold text-gray-200 shadow-md">Log In</a>}
                        {token ? "" : <a href="/auth/register" className="px-2 py-1 bg-indigo-800 font-semibold text-gray-200 shadow-md">Register</a>}
                        {token ? <button className="bg-red-600 px-2 py-1 text-gray-200 shadow-md" onClick={logOut}>Log Out</button> : ""}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
