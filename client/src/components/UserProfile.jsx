import { useContext, useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GoBriefcase } from "react-icons/go";
import { GrStatusGood } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataById } from "../helpers/UserRequest";
import { UserContext } from "../context/UserContext";
import { getPortfolioRequest, deleteProjectRequest } from "../helpers/ProjectRequest";
import { getQuote } from "../helpers/QuoteRequest";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiDeleteOutline } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {

    const { token } = useContext(UserContext);
    const { id } = useParams();
    const navigator = useNavigate();

    const [userObject, setUserObject] = useState({});
    const [portfolio, setPortfolio] = useState({projects: []});
    const [quote, setQuote] = useState('');

    const deleteProjectHandler = (projectId) => {
        const conf = window.confirm('Are you sure?');
        if (conf) {
            deleteProjectRequest(token, projectId).then(Response => {
                if (Response.status === 200) {
                    window.location.reload();
                }
            })
        }
    }

    useEffect(() => {

        if (!id) {
            navigator('/auth/login');
        }

        getUserDataById(token, id).then(Response => {
            setUserObject(Response.data);
        })

        getPortfolioRequest(token, id).then(Response => {
            if (Response.status === 200) {
                setPortfolio(Response.data);
            }
        })
        
        getQuote().then(Response => {
            if (Response.status === 200) {
                setQuote(Response.data[0]);
                console.log(Response.data)
            }
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
                    <h2 className="font-bold text-indigo-950 text-lg mb-4">Quote that fits this user</h2>
                    <p className="text-indigo-800 text-md italic ">"{quote.quote}"</p>
                    <p className="font-semibold text-indigo-950">by {quote.author}</p>
                </div>
                <div className="border-b border-solid text-left py-3 relative">
                    <h2 className="font-bold text-indigo-950 text-lg mb-3">My Projects</h2>
                    <button onClick={() => navigator('/projects/create')} className="font-bold text-2xl text-indigo-950 absolute top-1.5 right-0 transition hover:text-indigo-600">+</button>
                    <ul>
                        {portfolio && (
                            portfolio.projects.map(project => (
                                <li className="p-5 shadow-md rounded bg-indigo-200 mb-2 relative transition hover:bg-indigo-100" key={project._id}>
                                    <h3 className="font-semibold text-indigo-600">{project.name}</h3>
                                    <p className="text-gray-600 mb-5">{project.descr}</p>
                                    <Slider>
                                        {project.images.map(image => (
                                            <div key={image} className="h-40 w-5/6 px-5">
                                                <img className="w-full h-full object-contain" key={image} src={image} alt="" />
                                            </div>
                                        ))}
                                    </Slider>
                                    <div className="absolute top-6 right-3">
                                        <button onClick={() => {navigator(`/projects/edit/${project._id}`)}} className="text-indigo-600 text-sm -translate-y-0.5 transition hover:text-indigo-400 mr-2"><FaEdit /></button>
                                        <button onClick={() => {deleteProjectHandler(project._id)}} className="text-indigo-600 text-md -translate-y-0.25 transition hover:text-indigo-400"><TiDeleteOutline /></button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;