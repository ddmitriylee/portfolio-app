import { useState, useEffect } from "react";
import { getJobs } from "../helpers/JobsRequest";

const JobFinder = () => {

    const [jobs, setJobs] = useState([])
    const presetTags = [
        {value: "business", text: "Business Development"},
        {value: "data-science", text: "Data Science"},
        {value: "web-app-design", text: "Web & App Design"},
        {value: "engineering", text: "Software Engineering"},
        {value: "dev", text: "Development"},
        {value: "hr", text: "HR & Recruiting"},
        {value: "admin", text: "DevOps & SysAdmin"},
        {value: "marketing", text: "Marketing & Sales"}
    ]

    useEffect(() => {
        getJobs(4, null, null)
            .then((Response) => {
                if (Response.status === 200) {
                    setJobs(Response.data.jobs)
                }
            }).catch((error) => console.error(error))
        
        setJobs(jobs)
    }, [])

    const applyFilter = async(e) => {
        e.preventDefault()
        try {
            const response = await getJobs(4, e.target.value, null);
            if (response.status === 200) {
                setJobs(response.data.jobs)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto max-w-screen-xl">
            <div className="mx-auto max-w-xl shadow-md text-left px-10 py-16">
                <h2 className="font-bold text-2xl text-indigo-950 mb-4">Find job</h2>
                <div className="grid grid-cols-3 gap-3 text-white mb-8 border-y border-solid border-slate-300 py-2" >
                    {presetTags.map(preset => 
                        <button key={preset} value={preset.value} onClick={applyFilter} className="bg-indigo-500 shadow-md transition ease-in-out duration-300 px-5 py-3 rounded-md hover:bg-indigo-300 active:bg-slate-800">{preset.text}</button>
                    )}
                </div>
                <ul>
                    {jobs.map(job => 
                        <a href={job.url}>
                            <li key={job.id} className="bg-indigo-200 shadow-md rounded-md mb-8 flex relative transition ease-in-out duration-300 group cursor-pointer hover:bg-indigo-100">
                                <img src={job.companyLogo} alt={job.companyName} className="w-3/12 h-full rounded-l-md mr-4"/>
                                <div className="h-auto leading-5 w-2/3 py-1">
                                    <p className="font-semibold text-indigo-950">{job.companyName}</p>
                                    <p className="font-bold text-indigo-950">{job.jobTitle}</p>
                                    <p className="text-sm">Grade: {job.jobLevel}</p>
                                    <p className="text-sm">Location: {job.jobGeo}</p>
                                    <p className="text-slate-500 text-sm">Published: {job.pubDate}</p>
                                </div>
                                <div className=" ml-auto">
                                    
                                </div>
                            </li>
                        </a>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default JobFinder;