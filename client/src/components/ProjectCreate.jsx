import { useContext, useState } from "react";
import { createProjectRequest } from "../helpers/ProjectRequest";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProjectCreate = () => {

    const { token, id } = useContext(UserContext);
    const navigator = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');

    const createProject = (e) => {
        e.preventDefault();
        const project = { name: name, descr: description, images: [image1, image2, image3] };
        createProjectRequest(token, project).then(Response => {
            if (Response.status === 200) {
                navigator(`/main/user/${id}`)
            }
        })
    }

    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md text-left">
                <h2 className="font-bold text-2xl text-indigo-950 mb-6">Create New Project</h2>
                <form onSubmit={createProject} className="flex flex-col">
                    <label className="mb-2" htmlFor="name">Name of the Project</label>
                    <input onChange={(e) => {setName(e.target.value)}} className="py-1 px-2 mb-4 bg-slate-100 shadow-md" type="text" name="name" id="name" placeholder="Example Project" />
                    <label className="mb-2" htmlFor="description">Description of the Project</label>
                    <textarea onChange={(e) => {setDescription(e.target.value)}} className="mb-4 bg-slate-100 shadow-md px-2 py-1" name="description" id="" rows="3" placeholder="Provide link to git"></textarea>
                    <label className="mb-2" htmlFor="image1">Links for the images</label>
                    <input onChange={(e) => {setImage1(e.target.value)}} className="py-1 px-2 bg-slate-100 shadow-md mb-4" type="text" name="image1" id="image1" placeholder="image1.png" />
                    <input onChange={(e) => {setImage2(e.target.value)}} className="py-1 px-2 bg-slate-100 shadow-md mb-4" type="text" name="image2" id="image2" placeholder="image2.png" />
                    <input onChange={(e) => {setImage3(e.target.value)}} className="py-1 px-2 bg-slate-100 shadow-md mb-6" type="text" name="image3" id="image3" placeholder="image3.png" />
                    <button className="bg-indigo-700 shadow-md py-2 text-gray-200 font-semibold" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProjectCreate;