import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ButtonComponent, InputComponent } from '@shared/components';
import { useEffect } from 'react';
import jcLogo from '../../../assets/logo/jc_balance_icon.webp';
import { useActionForm } from '@shared/hooks';

export const ResetPasswordPage = () => {
    const { t } = useTranslation();
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // Query params
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || 'example@example.com';


    const resetPasswordAction = async (_: any, formData: FormData) => {
        const newPassword = formData.get('newPassword') as string;
        try {
            await resetPassword.mutateAsync({ email, token, newPassword });
            resetForm();
            return { error: null, success: t('passwordResetSuccess') };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorInvalidCredentials') };
        }
    };



    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit, resetForm } = useActionForm({
        action: resetPasswordAction,
        initialState: { newPassword: '', confirmNewPassword: '' },
        validate: (values) => {
            const errs: any = {};
            if (values.newPassword.length < 8) errs.newPassword = t('errorPasswordShort');
            if (values.confirmNewPassword !== values.newPassword) errs.confirmNewPassword = t('errorPasswordsDoNotMatch');
            return errs;
        }
    });


    useEffect(() => {
        if (serverState.success) {
            setTimeout(() => navigate('/login'), 1500);
        }
    }, [serverState.success, navigate]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-page-bg p-4 transition-colors">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl">

                <header className="text-center mb-8">
                    <img src={jcLogo} className='mx-auto mb-2' alt="JC Balance" width={48} />
                    <h1 className="text-3xl font-bold text-page-text tracking-tight">
                        {t('appName')}
                    </h1>
                    <p className="text-sm text-page-text/60 mt-2">
                        {t('appTagline')}
                    </p>
                </header>

                <form action={handleSubmit} className="space-y-5">
                    <InputComponent
                        type="email"
                        label={t('labelEmail')}
                        readOnly
                        disabled
                        value={email}
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
                    {serverState?.success && (
                        <div className="p-3 text-sm bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg animate-fade-in ">
                            {serverState.success}
                        </div>
                    )}

                    <ButtonComponent
                        type="submit"
                        arialLabel='reset-password'
                        disabled={isPending || !isFormValid}
                        className='w-full'
                    >
                        {isPending ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-primary-text/30 border-t-primary-text rounded-full animate-spin" />
                                {t('statusValidating')}
                            </div>
                        ) : (
                            t('buttonResetPassword')
                        )}
                    </ButtonComponent>

                    <footer className="mt-8 pt-6 border-t border-border/50 text-center flex flex-col gap-4">
                        <p className="text-sm text-page-text/60">
                            {t('textNoAccount')}{' '}
                            <Link aria-label='link-register' className="font-bold text-secondary hover:underline" to='/register'>
                                {t('linkRegister')}
                            </Link>
                        </p>
                        <Link aria-label='link-login' className="text-xs font-medium text-page-text/40 hover:text-secondary transition-colors" to='/login'>
                            {t('linkBackToLogin')}
                        </Link>
                    </footer>
                </form>
            </div>
        </div>
    );
};