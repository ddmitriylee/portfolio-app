import axios from 'axios'

const BASE_API = 'https://jobicy.com/api/v2/remote-jobs?';


export const getJobs = async(count, industry, tag) => {
    let requestString = BASE_API
    requestString = count ? requestString + `count=${count}&` : requestString
    requestString = industry ? requestString + `industry=${industry}` : requestString
    requestString = tag ? requestString + `tag=${tag}` : requestString
    let response
    try {
        response = await axios.get(requestString)
    } catch (error) {
        response = error.response
    }
    console.log(response)
    return response
}