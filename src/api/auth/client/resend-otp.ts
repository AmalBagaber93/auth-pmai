import { apiClient } from "@/utils/fetch/api-client";


export interface IResendOtpRequest {
  vid: string;
}

export interface IResendOtpResponse {
  success: boolean;
  data: {
    vid: string;
    message: string;
  };
}

export async function resendOtp(
  data: IResendOtpRequest
): Promise<IResendOtpResponse> {
  return apiClient
    .post('auth/resend-registration-otp', { json: data })
    .json<IResendOtpResponse>();
}
