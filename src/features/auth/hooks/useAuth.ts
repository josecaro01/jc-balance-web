import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authApi } from '../api';
import { useAuthStore } from '../store';
import type { UserSearchFilter } from '../types';
import type { PageParams } from '@shared/types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { status, setAuthenticated, setUnauthenticated, logout: logoutStore, user } = useAuthStore();

  const { data: userData, isError } = useQuery({
    queryKey: ['auth-user'],
    queryFn: authApi.getUser,
    retry: false,
    enabled: status === 'checking',
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (userData && status === 'checking') {
      setAuthenticated(userData);
    } else if (isError && status === 'checking') {
      setUnauthenticated();
    }
  }, [userData, isError, status, setAuthenticated, setUnauthenticated]);


  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      const data = await authApi.getUser();
      setAuthenticated(data);
      queryClient.setQueryData(['auth-user'], data);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
  });

  const sendResetPasswordEmailMutation = useMutation({
    mutationFn: authApi.sendResetPasswordEmail,
    onSuccess: (_) => {
      const expiry = Date.now() + 5 * 60 * 1000;
      localStorage.setItem('last_request_reset_password', expiry.toString());
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      logoutStore();
      queryClient.clear();
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
  });


  const adminChangePasswordMutation = useMutation({
    mutationFn: authApi.adminChangePassword,
  });

    const adminGetUserMutation = useMutation({
    mutationFn: authApi.adminGetUser,
  }); 

  const searchUserMutation = useMutation({
   mutationFn: ({ filter, pageParams }: { filter: UserSearchFilter; pageParams: PageParams }) => 
    authApi.searchUser(filter, pageParams),
  });


  const updateMutation = useMutation({
    mutationFn: authApi.updateUser,
    onSuccess: (data) => {
      setAuthenticated(data);
      queryClient.setQueryData(['auth-user'], data);
    },
  });



  return {
    user: userData || user,
    status,
    login: loginMutation,
    logout: logoutMutation,
    register: registerMutation,
    sendResetPasswordEmail: sendResetPasswordEmailMutation,
    resetPassword: resetPasswordMutation,
    changePassword: changePasswordMutation,
    adminChangePassword: adminChangePasswordMutation,
    adminGetUser: adminGetUserMutation,
    searchUser: searchUserMutation,
    updateUser: updateMutation,
    
  };
};

