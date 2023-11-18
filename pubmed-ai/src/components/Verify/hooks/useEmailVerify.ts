import { UseQueryResult, useQuery } from '@tanstack/react-query'
import verifyEmail, { VerifyEmailReturn } from '../../../services/verifyEmail'

export type UseEmailVerifyProps = {
    token: string
    enabled: boolean
}

const useEmailVerify = ({
    token,
    enabled,
}: UseEmailVerifyProps): UseQueryResult<VerifyEmailReturn, Error> => {
    return useQuery({
        queryKey: ['verify'],
        queryFn: () => verifyEmail(token),
        staleTime: Infinity,
        enabled: enabled,
    })
}

export default useEmailVerify
