import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { deleteUserById, getAllUsersData } from "../helpers/UserRequest";
import { GrFormView } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";

const AdminPanel = () => {

    const { token, isAdmin } = useContext(UserContext);
    const navigator = useNavigate();

    const [userArray, setUserArray] = useState([]);

    useEffect(() => {
        if (!token || !isAdmin()) {
            navigator('/auth/login');
        }

        getAllUsersData(token).then(Response => {
            if (Response.status === 200) {
                console.log(Response.data)
                setUserArray(Response.data);
            }
        })
    }, [userArray])

    const viewProfileHandler = (userId) => {
        navigator(`/main/user/${userId}`);
    }

    const deleteProfileHandler = (userId) => {
        deleteUserById(token, userId).then((Response) => {
            if (Response.status === 200) {
                console.log('deleted')
            }
        })
    }

    return (
        <div className="container max-w-screen-xl mx-auto">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md text-left">
                <h2 className="text-2xl font-bold text-indigo-950 mb-5">Hello, Admin!</h2>
                <table className="border-collapse border-hidden w-full text-center text-slate-500 shadow-md">
                    <thead className="bg-slate-200 text-lg border-b-1 py-2 border-slate-500">
                        <tr>
                            <th className="py-3">User</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Role</th>
                            <th className="py-3">Options</th>
                        </tr>
                    </thead>
                    <tbody className="text-md bg-slate-50">
                        {userArray.map((user) => (
                            <tr key={user._id} className="border-b-1 border-slate-500">
                                <td className="py-2">{user.fullName}</td>
                                <td className="py-2">{user.email}</td>
                                <td className="py-2">{user.isAdmin ? "Admin" : "User"}</td>
                                <td className="py-2">
                                    <button onClick={() => {viewProfileHandler(user._id)}} className="p-2"><GrFormView className="-translate-y-0.5 inline text-2xl" /></button>
                                    <button onClick={() => {deleteProfileHandler(user._id)}} className="p-2"><TiDeleteOutline className="-translate-y-0.5 inline text-lg" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminPanel;