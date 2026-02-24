import { apiClient } from "@/utils/fetch/api-client";

export interface IVerifyForgotPasswordOtpRequest {
  vid: string;
  code: string;
}

export interface IVerifyForgotPasswordOtpResponse {
  data: {
    message: string;
    reset_token: string;
    expires_at: string;
  };
}

export async function verifyForgotPasswordOtp(
  data: IVerifyForgotPasswordOtpRequest
): Promise<IVerifyForgotPasswordOtpResponse> {
  return apiClient
    .post('auth/forgot-password/verify-otp', { json: data })
    .json<IVerifyForgotPasswordOtpResponse>();
}
