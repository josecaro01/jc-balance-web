import { ButtonComponent, UserIcon } from "@shared/components";
import { UpdateProfileModal } from './UpdateProfileModal'
import { useTranslation } from "react-i18next";
import { useAuth } from "@features/auth/hooks";
import { useState } from "react";
import { ChangePasswordModal } from ".";

export const ProfileSettings = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    return (
        <section className="p-6 rounded-2xl border border-border shadow-sm bg-card space-y-4">
            <h2 className="text-lg font-bold tracking-tight">{t('account')}</h2>
            <p className="text-sm text-slate-500">{t('profileDetails')}</p>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <UserIcon className="shrink-0" width={20} height={20} />
                    <span className="truncate">{t('userName', { name: user?.name + ' ' + user?.lastName })}</span>
                </div>
                <div className="flex items-center gap-3">
                    <UserIcon className="shrink-0" width={20} height={20} />
                    <span className="truncate">{t('userEmail', { email: user?.email })}</span>
                </div>
                <div className="flex  flex-col sm:flex-row gap-4"><ButtonComponent className="w-full" children={t('editProfile')} onClick={() => setIsUpdateProfileModalOpen(true)} />
                    <ButtonComponent className="w-full" children={t('changePassword')} onClick={() => setIsChangePasswordModalOpen(true)} />
                </div>
                <UpdateProfileModal open={isUpdateProfileModalOpen} onClose={() => setIsUpdateProfileModalOpen(false)} />
                <ChangePasswordModal open={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)} />
            </div>
        </section>
    );
}