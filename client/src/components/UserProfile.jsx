import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/UserRequest";
import { UserContext } from "../context/UserContext";

const UserProfile = () => {

    const { token } = useContext(UserContext);
    const navigator = useNavigate();

    const [userObject, setUserObject] = useState({});

    useEffect(() => {

        if (!token) {
            navigator('/auth/login');
        }

        getUserData(token).then(Response => {
            setUserObject(Response.data)
        })
    }, [])

    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md">
                <h2 className="font-bold text-indigo-950 text-xl">{userObject.fullName}</h2>
                <h4 className="text-indigo-800">@{userObject.login}</h4>
                <h4 className="text-indigo-950">{userObject.age} y.o</h4>
                <div className="text-center pb-3">
                    <p className="text-indigo-950"><CiLocationOn className="inline -translate-y-0.5 mr-1" /> {userObject.city}, {userObject.country}</p>
                    <p className="text-indigo-950"><GoBriefcase className="inline -translate-y-0.5 mr-1" /> {userObject.proffession}</p>
                    <p className="text-indigo-950"><GrStatusGood className="inline -translate-y-0.5 mr-1" />{userObject.isAdmin ? "Admin" : "User"}</p>
                </div>
                <div className="border-t border-solid text-left py-3">
                    <h2 className="font-bold text-indigo-950 text-lg">My Projects</h2>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;