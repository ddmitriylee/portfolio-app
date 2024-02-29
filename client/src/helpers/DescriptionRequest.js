import axios from "axios";

const api = axios.create({
    baseURL: "https://api.chucknorris.io/jokes/random"
})

export const getDescr = () => {
    return api.get('/?category={career}');
}