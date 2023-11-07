import axios from 'axios'
import { API_URL } from '../lib/config'

export type LoginUserReturn = {
    accessToken: string
    status: string
    message: string
}

const loginUser = async (
    email: string,
    password: string
): Promise<LoginUserReturn> => {
    const body = {
        email: email,
        password: password,
    }

    const { data } = await axios.post(`${API_URL}/login`, body)

    return data
}

export default loginUser
