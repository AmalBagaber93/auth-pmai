import { apiClient } from "@/utils/fetch/api-client";

export interface IResetPasswordRequest {
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordResponse {
  data: {
    message: string;
  };
}

export async function resetPassword(
  data: IResetPasswordRequest
): Promise<IResetPasswordResponse> {
  return apiClient
    .post('auth/forgot-password/reset', { json: data })
    .json<IResetPasswordResponse>();
}
