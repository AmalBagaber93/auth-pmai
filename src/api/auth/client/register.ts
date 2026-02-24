import { apiClient } from "@/utils/fetch/api-client";

export interface IRegisterRequest {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirmation: string,
    terms_accepted: boolean,
}

export interface IRegisterResponse {
    data: {
        message: string;
        resend_cooldown_seconds: number;
        vid: string;
    }
}

export async function register(data: IRegisterRequest): Promise<IRegisterResponse> {
    return apiClient.post('auth/register', {
        json: data
    }).json<IRegisterResponse>();
}
