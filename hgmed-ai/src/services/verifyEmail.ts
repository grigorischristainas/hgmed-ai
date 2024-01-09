import axios from 'axios'
import { API_URL } from '../lib/config'

export type VerifyEmailReturn = {
    status: string
    message: string
}

const verifyEmail = async (token: string): Promise<VerifyEmailReturn> => {
    const { data } = await axios.get(`${API_URL}/email/verify?token=${token}`)

    return data
}

export default verifyEmail
