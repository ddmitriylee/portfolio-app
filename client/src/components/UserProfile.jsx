import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { GrStatusGood } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataById } from "../helpers/UserRequest";
import { UserContext } from "../context/UserContext";
import { getPortfolioRequest } from "../helpers/ProjectRequest";
import { getDescr } from "../helpers/DescriptionRequest";

const UserProfile = () => {

    const { token } = useContext(UserContext);
    const { id } = useParams();
    const navigator = useNavigate();

    const [userObject, setUserObject] = useState({});
    const [projectsArr, setProjectsArr] = useState([]);

    useEffect(() => {

        if (!id) {
            navigator('/auth/login');
        }

        getUserDataById(token, id).then(Response => {
            setUserObject(Response.data)
        })

        getPortfolioRequest(token, id).then(Response => {
            setProjectsArr(Response.data);
        }) 
    }, [])

    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md">
                <FaRegUserCircle className="block mx-auto w-20 h-20" />
                <h2 className="font-bold text-indigo-950 text-xl">{userObject.fullName}</h2>
                <h4 className="text-indigo-800">@{userObject.login}</h4>
                <h4 className="text-indigo-950">{userObject.age} y.o</h4>
                <div className="text-center pb-3">
                    <p className="text-indigo-950"><CiLocationOn className="inline -translate-y-0.5 mr-1" /> {userObject.city}, {userObject.country}</p>
                    <p className="text-indigo-950"><GoBriefcase className="inline -translate-y-0.5 mr-1" /> {userObject.proffession}</p>
                    <p className="text-indigo-950"><GrStatusGood className="inline -translate-y-0.5 mr-1" />{userObject.isAdmin ? "Admin" : "User"}</p>
                </div>
                <div className="border-y border-solid text-left py-3">
                    <h2 className="font-bold text-indigo-950 text-lg">About Me</h2>
                    <p className="text-indigo-800 text-md"></p>
                </div>
                <div className="border-b border-solid text-left py-3 relative">
                    <h2 className="font-bold text-indigo-950 text-lg">My Projects</h2>
                    <button onClick={() => navigator('/projects/create')} className="font-bold text-2xl text-indigo-950 absolute top-1.5 right-0">+</button>
                    <ul>
                        {projectsArr.map(project => 
                            <li key={project._id}>
                                <h4>{project.name}</h4>
                                <p>{project.descr}</p>
                                <img src={project.image[0]} alt="" />
                            </li>    
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;