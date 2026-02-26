'use client';

import { useQuery } from '@tanstack/react-query';
import { user, type IUserResponse } from '../../client/user';

interface UseUserQueryProps {
  initialData?: IUserResponse | null;
}

export function useUserQuery(options?: UseUserQueryProps) {
  const { initialData } = options || {};

  return useQuery({
    queryKey: ['user'],
    queryFn: user,
    initialData: initialData ?? undefined,
  });
}
