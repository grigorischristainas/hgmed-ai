import axios from 'axios'
import { API_URL } from '../lib/config'

const loginUser = async (email: string, password: string) => {
    const body = {
        email: email,
        password: password,
    }

    const { data } = await axios.post(`${API_URL}/login`, body)

    return data
}

export default loginUser
