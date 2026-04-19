import { apiClient } from "@shared/api";
import type { AdminChangePassword, ChangePassword, LoginCredentials, RegisterCredentials, ResetPassword, User, UserSearchFilter } from "../types";
import type { PageParams, PaginatedResult } from "@shared/types";


export const authApi = {
    // 1. Login: El back setea la cookie automáticamente
    login: async (credentials: LoginCredentials): Promise<void> => {
        await apiClient.post(`/login`, credentials);
    },

    register: async (credentials: RegisterCredentials): Promise<void> => {
        await apiClient.post(`/users`, credentials
        );
    },

    sendResetPasswordEmail: async (email: string): Promise<void> => {
        await apiClient.get(`/users/send-reset-password/${email}`,
        );
    },

    resetPassword: async (resetPassword: ResetPassword): Promise<void> => {
        await apiClient.post(`/users/reset-password`, resetPassword
        );
    },

    changePassword: async (changePassword: ChangePassword): Promise<void> => {
        await apiClient.post(`/users/me/change-password`, changePassword);
    },

    getUser: async (): Promise<User> => {
        const { data } = await apiClient.get<User>('/users/me');
        return data;
    },

    logout: async (): Promise<void> => {
        await apiClient.get('/users/logout');
    },
    /* ADMIN METHODS */
    adminChangePassword: async (adminChangePassword: AdminChangePassword): Promise<void> => {
        await apiClient.post(`/users/${adminChangePassword.userId}/change-password`, { newPassword: adminChangePassword.newPassword });
    },
    adminGetUser: async (userId: string): Promise<User> => {
        const { data } = await apiClient.get<User>(`/users/${userId}`);
        return data;
    },
    searchUser: async (filter: UserSearchFilter, pageParams: PageParams): Promise<PaginatedResult<User>> => {
        const { data } = await apiClient.post<PaginatedResult<User>>('/users/search', filter, { params: pageParams });
        return data;
    },
    updateUser: async (user: Partial<User>): Promise<User> => {
        const { data } = await apiClient.put<User>(`/users/${user.id}`, user);
        return data;
    },


};