export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export interface AdminChangePassword {
    userId: string;
    newPassword: string;
}