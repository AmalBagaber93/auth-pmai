import { IUserData } from "@/@types/common";
import { apiClient } from "@/utils/fetch/api-client";

export interface IVerifyOtpRequest {
  vid: string;
  code: string;
}


export interface IVerifyOtpResponse {
  data: {
    message: string;
    token: string;
    expires_at: string;
    user: IUserData;
  };
}

export async function verifyOtp(data: IVerifyOtpRequest): Promise<IVerifyOtpResponse> {
  return apiClient.post('auth/verify-otp', {
    json: data
  }).json<IVerifyOtpResponse>();
}
