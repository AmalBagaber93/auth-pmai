import { IUserData } from "@/@types/common";
import { apiClient } from "@/utils/fetch/api-client";

export interface ILoginRequest {
    email: string;
    password: string;
    remember_me: boolean;
}
export interface ILoginResponse {
    message: string;
    data: {
        token: string;
        expires_at: string;
        email_verified?: boolean;
        // vid?: string;
        action_required: string
        user: IUserData
    }
}

export async function login(data: ILoginRequest): Promise<ILoginResponse> {
    return apiClient.post('auth/login', {
        json: { ...data }
    }).json<ILoginResponse>();
}
