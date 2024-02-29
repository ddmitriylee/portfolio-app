import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {

    const navigator = useNavigate();

    const { cleanSession, token, isAdmin } = useContext(UserContext);

    const logOut = () => {
        cleanSession();
        navigator('/auth/login');
    }

    isAdmin()

    return (
        <header className="p-4 bg-indigo-950 mb-10 shadow-md">
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <nav>
                    <ul className="flex flex-row text-gray-200 justify-between">
                        <li>
                            <a href="/main/jobs" className="font-bold py-1 px-2 mr-4">Watch jobs</a>
                        </li>
                        <li>
                            <a href="/main/profile" className="font-bold py-1 px-2 mr-4">My profile</a>
                        </li>
                        {isAdmin() && (
                            <li><a href="/admin/adminpanel" className="font-bold py-1 px-2">Manage Users</a></li>
                        )}
                    </ul>
                </nav>
                <div className="flex flex-row justify-between">
                    {token ? "" : <a href="/auth/login" className="mr-2 px-2 py-1 bg-indigo-400 font-semibold text-gray-200 shadow-md">Log In</a>}
                    {token ? "" : <a href="/auth/register" className="px-2 py-1 bg-indigo-800 font-semibold text-gray-200 shadow-md">Register</a>}
                    {token ? <button className="bg-red-600 px-2 py-1 text-gray-200 shadow-md" onClick={logOut}>Log Out</button> : ""}
                </div>
            </div>
        </header>
    );
};

export default Header;
