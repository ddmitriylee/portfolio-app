import axios from "axios";
import { apininjaskey } from '../config'

const api = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/quotes?category=success',
    headers: {
        'X-Api-Key': apininjaskey
    }
})

export const getQuote = () => {
    return api.get();
}