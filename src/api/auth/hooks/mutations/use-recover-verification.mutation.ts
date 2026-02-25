import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"

import { IRecoverVerificationRequest, IRecoverVerificationResponse, recoverVerification } from "../../client/recover-verification"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useRecoverVerification = () => {
    const router = useRouter();
    return useMutation<IRecoverVerificationResponse, Error, IRecoverVerificationRequest>({
        mutationFn: recoverVerification,
        mutationKey: ['RECOVER_VERIFICATION'],
        onSuccess: (response, variables) => {
            Cookies.set('auth_email', variables.email)
            Cookies.set('auth_vid', response.data.vid)
            router.push('/otp-verify');
        },
        onError: (error: any) => {
            const data = JSON.parse(error.message);
            toast.error(data.message || "Something went wrong'");

        },

    })

}