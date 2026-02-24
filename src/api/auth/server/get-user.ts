import { cookies } from 'next/headers';
import type { IGetUserResponse } from '../client/get-user';
import { apiServer } from '@/utils/fetch/api-server';

export async function getUserServer(): Promise<IGetUserResponse | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    return await apiServer.get('user/me').json<IGetUserResponse>();
  } catch (error) {
    console.error('getUserServer error:', error);
    return null;
  }
}
