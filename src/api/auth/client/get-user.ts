import { apiClient } from "@/utils/fetch/api-client";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string
  status: string;
  roles: string[];
  email_verified_at: string;
}

export interface IGetUserResponse {
  data: IUser;
}

export async function getUser(): Promise<IGetUserResponse> {
  return apiClient.get('user/me').json<IGetUserResponse>();
}
