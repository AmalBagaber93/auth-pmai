import { apiClient } from "@/utils/fetch/api-client";
import { apiServer } from "@/utils/fetch/api-server";


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

export async function getUserServer(): Promise<IUserResponse> {
    const getApiServer = await apiServer;
    return getApiServer.get('user/me').json<IUserResponse>();
}
