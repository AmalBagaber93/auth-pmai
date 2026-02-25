import { apiClient } from "@/utils/fetch/api-client"

export interface IRecoverVerificationResponse {
    data: {
        message: string
        vid: string
        remaining_attempts: number
        resend_cooldown_seconds: number
    }
}

export interface IRecoverVerificationRequest {
    email: string
}

export async function recoverVerification(data: IRecoverVerificationRequest): Promise<IRecoverVerificationResponse> {

    return apiClient.post('auth/recover-verification', { json: data }).json<IRecoverVerificationResponse>()
}