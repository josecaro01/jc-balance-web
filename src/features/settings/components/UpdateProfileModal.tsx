import { useTranslation } from 'react-i18next';
import { useAuth } from '@features/auth/hooks';
import { ButtonComponent, InputComponent, LockIcon, } from '@shared/components';
import { useActionForm, useSnackbar } from '@shared/hooks';
import type { User } from '@features/auth/types';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const UpdateProfileModal = ({ open, onClose, }: Props) => {
    const { t } = useTranslation();
    const { user, updateUser } = useAuth();
    const { showSnackbar } = useSnackbar();

    const updateUserAction = async (_: any, formData: FormData) => {
        if (!user) return { success: null, error: t('errorUserNotFound') };
        const payload: Partial<User> = {
            id: user!.id,
            name: formData.get('name') as string,
            lastName: formData.get('lastName') as string,
        };
        try {
            await updateUser.mutateAsync(payload);
            onClose();
            showSnackbar(t('profileUpdated'), 'success');
            return { error: null, success: t('profileUpdated') };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorTransactionFailed') };
        }
    };

    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit } = useActionForm({
        action: updateUserAction,
        initialState: { name: user?.name, lastName: user?.lastName },
        validate: (values) => {
            const errs: any = {};
            if (values.name === 'name' && !values.name.trim()) errs.name = t('errorFirstNameRequired');
            if (values.lastName === 'lastName' && !values.lastName.trim()) errs.lastName = t('errorLastNameRequired');
            return errs;
        }
    });


    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-xl">

                <header className="mb-6">
                    <h2 className="text-2xl font-bold text-page-text">
                        {t('editProfile')}
                    </h2>
                </header>

                <form action={handleSubmit} className="space-y-4">

                    <InputComponent
                        name="email"
                        label={t('labelEmail')}
                        defaultValue={user?.email || ""}
                        disabled
                        required
                        icon={LockIcon}
                    />

                    <InputComponent
                        name="name"
                        label={t('labelFirstName')}
                     
                        value={fields.name}
                        onChange={handleChange}
                        error={errors.name || undefined}
                        required
                    />

                    <InputComponent
                        name="lastName"
                        label={t('labelLastName')}
                      
                        value={fields.lastName}
                        onChange={handleChange}
                        error={errors.lastName || undefined}
                        required
                    />




                    {serverState?.error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                            {serverState.error}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-8">
                        <ButtonComponent
                            type="button"
                            onClick={onClose}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </ButtonComponent>
                        <ButtonComponent
                            type="submit"
                            disabled={isPending || !isFormValid}
                        >
                            {isPending ? t('saving') : t('update')}
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    );
};