import { useContext, useEffect, useState } from "react";
import { createProjectRequest, getOneProjectRequest, updateProjectRequest } from "../helpers/ProjectRequest";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const ProjectCreate = () => {

    const { token, id } = useContext(UserContext);
    const navigator = useNavigate();
    const { id: projectId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');

    useEffect(() => {
        if (projectId) {
            getOneProjectRequest(token, projectId)
                .then(response => {
                    if (response.status === 200) {
                        const projectData = response.data;
                        setName(projectData.name);
                        setDescription(projectData.descr);
                        setImage1(projectData.images[0]);
                        setImage2(projectData.images[1]);
                        setImage3(projectData.images[2]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching project data:", error);
                });
        }
    }, [projectId, token]);

    const createProject = (e) => {
        e.preventDefault();
        const project = { name: name, descr: description, images: [image1, image2, image3] };

        if (projectId) {
            updateProjectRequest(token, project, projectId).then(Response => {
                if (Response.status === 200) {
                    navigator(`/main/user/${id}`)
                }
            })
            .catch(error => {
                console.error("Error editing project:", error);
            });
        } else {
            createProjectRequest(token, project)
                .then(response => {
                    if (response.status === 200) {
                        navigator(`/main/user/${id}`);
                    }
                })
                .catch(error => {
                    console.error("Error creating project:", error);
                });
        }
    }

    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl px-10 py-16 shadow-md text-left">
                <h2 className="font-bold text-2xl text-indigo-950 mb-6">Create New Project</h2>
                <form onSubmit={createProject} className="flex flex-col">
                    <label className="mb-2" htmlFor="name">Name of the Project</label>
                    <input onChange={(e) => {setName(e.target.value)}} value={name} className="py-1 px-2 mb-4 bg-slate-100 shadow-md" type="text" name="name" id="name" placeholder="Example Project" />
                    <label className="mb-2" htmlFor="description">Description of the Project</label>
                    <textarea onChange={(e) => {setDescription(e.target.value)}} value={description} className="mb-4 bg-slate-100 shadow-md px-2 py-1" name="description" id="" rows="3" placeholder="Provide link to git"></textarea>
                    <label className="mb-2" htmlFor="image1">Links for the images</label>
                    <input onChange={(e) => {setImage1(e.target.value)}} value={image1} className="py-1 px-2 bg-slate-100 shadow-md mb-4" type="text" name="image1" id="image1" placeholder="image1.png" />
                    <input onChange={(e) => {setImage2(e.target.value)}} value={image2} className="py-1 px-2 bg-slate-100 shadow-md mb-4" type="text" name="image2" id="image2" placeholder="image2.png" />
                    <input onChange={(e) => {setImage3(e.target.value)}} value={image3} className="py-1 px-2 bg-slate-100 shadow-md mb-6" type="text" name="image3" id="image3" placeholder="image3.png" />
                    <button className="bg-indigo-700 shadow-md py-2 text-gray-200 font-semibold" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ProjectCreate;