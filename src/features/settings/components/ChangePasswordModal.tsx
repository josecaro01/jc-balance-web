import { useTranslation } from 'react-i18next';
import { useAuth } from '@features/auth/hooks';
import { ButtonComponent, InputComponent } from '@shared/components';
import { useActionForm, useSnackbar } from '@shared/hooks';

interface Props {
    open: boolean;
    onClose: () => void;
}

export const ChangePasswordModal = ({ open, onClose, }: Props) => {
    const { t } = useTranslation();
    const { changePassword } = useAuth();
    const { showSnackbar } = useSnackbar();



    const changePasswordAction = async (_: any, formData: FormData) => {
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        try {
            await changePassword.mutateAsync({ oldPassword, newPassword });
            onClose();
            showSnackbar(t('passwordChangedSuccess'), 'success');
            return { error: null, success: t('passwordChangedSuccess') };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorChangingPassword') };
        }
    };



    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit } = useActionForm({
        action: changePasswordAction,
        initialState: { oldPassword: '', newPassword: '', confirmNewPassword: '' },
        validate: (values) => {
            const errs: any = {};
            if (values.newPassword.length < 8) errs.newPassword = t('errorPasswordShort');
            if (values.confirmNewPassword !== values.newPassword) errs.confirmNewPassword = t('errorPasswordsDoNotMatch');
            return errs;
        }
    });


    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-xl">

                <header className="mb-6">
                    <h2 className="text-2xl font-bold text-page-text">
                        {t('changePassword')}
                    </h2>
                </header>


                <form action={handleSubmit} className="space-y-5">

                    <InputComponent
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        label={t('labelOldPassword')}
                        placeholder={t('placeholderPassword')}
                        value={fields.oldPassword}
                        onChange={handleChange}
                        error={errors.oldPassword || undefined}
                        required
                        minLength={8}
                    />
                    <InputComponent
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        label={t('labelNewPassword')}
                        placeholder={t('placeholderPassword')}
                        value={fields.newPassword}
                        onChange={handleChange}
                        error={errors.newPassword || undefined}
                        required
                        minLength={8}
                    />

                    <InputComponent
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        label={t('labelConfirmNewPassword')}
                        placeholder={t('placeholderPassword')}
                        value={fields.confirmNewPassword}
                        onChange={handleChange}
                        error={errors.confirmNewPassword || undefined}
                        required
                        minLength={8}
                    />

                    {serverState?.error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg animate-fade-in">
                            {serverState.error}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-8">
                        <ButtonComponent
                            type="button"
                            className='w-full'
                            onClick={onClose}
                            variant="outlined"
                        >
                            {t('cancel')}
                        </ButtonComponent>
                        <ButtonComponent
                            type="submit"
                            disabled={isPending || !isFormValid}
                            className='w-full'
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-primary-text/30 border-t-primary-text rounded-full animate-spin" />
                                    {t('statusValidating')}
                                </div>
                            ) : (
                                t('changePassword')
                            )}
                        </ButtonComponent>
                    </div>
                </form>
            </div>
        </div>
    );
};