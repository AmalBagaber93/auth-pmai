'use client';

import { useQuery } from '@tanstack/react-query';
import { getUser, type IGetUserResponse } from '../../client/get-user';

interface UseUserQueryOptions {
  initialData?: IGetUserResponse | null;
}

export function useUserQuery(options?: UseUserQueryOptions) {
  const { initialData } = options || {};

  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    initialData: initialData ?? undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
