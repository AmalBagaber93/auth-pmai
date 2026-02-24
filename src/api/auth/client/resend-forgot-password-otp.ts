import { apiClient } from "@/utils/fetch/api-client";

export interface IResendForgotPasswordOtpRequest {
  vid: string;
}

export interface IResendForgotPasswordOtpResponse {
  data: {
    message: string;
    vid: string;
    resend_cooldown_seconds?: number;
    expiry_cooldown_seconds?: number;
  };
}

export async function resendForgotPasswordOtp(
  data: IResendForgotPasswordOtpRequest
): Promise<IResendForgotPasswordOtpResponse> {
  return apiClient
    .post('auth/forgot-password/resend-otp', { json: data })
    .json<IResendForgotPasswordOtpResponse>();
}
