import { cookies } from 'next/headers';
import type { IUserResponse } from '../client/user';
import { apiServer } from '@/utils/fetch/api-server';

export async function getUserServer(): Promise<IUserResponse | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    return await apiServer.get('user/me').json<IUserResponse>();
  } catch (error) {
    console.error('getUserServer error:', error);
    return null;
  }
}
