import { apiClient } from "@/utils/fetch/api-client";

export interface IForgotPasswordRequest {
    email: string;
}
export interface IForgotPasswordResponse {
    data: {
        message: string;
        vid: string;
        resend_cooldown_seconds: number
        expiry_cooldown_seconds: number;
    }
}

export async function forgotPassword(data: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    return apiClient.post('auth/forgot-password', {
        json: { ...data }
    }).json<IForgotPasswordResponse>();
}
