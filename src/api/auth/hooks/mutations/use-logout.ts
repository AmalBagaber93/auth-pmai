

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { toast } from 'sonner';


export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  function handleLogout() {
    Cookies.remove('token');
    Cookies.remove('auth_email');
    Cookies.remove('auth_vid');

    queryClient.clear();
    toast.success('You have been logged out successfully');
    router.push('/login');
  }

  return { logout: handleLogout };
}
