import axios from 'axios'
import { API_URL } from '../lib/config'

export type SignUpUserReturn = {
    status: string
    message: string
}

const signupUser = async (
    email: string,
    password: string
): Promise<SignUpUserReturn> => {
    const body = {
        email: email,
        password: password,
    }

    const { data } = await axios.post(`${API_URL}/users`, body)

    return data
}

export default signupUser
