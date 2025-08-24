import axios from "axios";
import type { LoginData } from "../types/Auth";
const baseUrl = '/api/login'

const login = (loginData: LoginData) => {
    const request = axios.post(baseUrl, loginData)
    return request.then(response => response.data)
}

export default { login }