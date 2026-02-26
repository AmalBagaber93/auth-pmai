import { apiClient } from "@/utils/fetch/api-client";


export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  roles: string[];
  email_verified_at: string | null;
}

export interface IUserResponse {
  data: IUser;
}

export async function user(): Promise<IUserResponse> {
  return apiClient.get('user/me').json<IUserResponse>();
}
