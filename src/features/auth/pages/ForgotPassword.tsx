import { useEffect, useState, } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import jcLogo from '../../../assets/logo/jc_balance_icon.webp';
import { useActionForm } from '@shared/hooks';
import { ButtonComponent, InputComponent } from '@shared/components';
import { formatSecondsToTime } from '@shared/utils';

export const ForgotPasswordPage = () => {

    const { t } = useTranslation();
    const { sendResetPasswordEmail } = useAuth();
    const [countdown, setCountdown] = useState((() => {
        const expiry = localStorage.getItem('last_request_reset_password');
        if (!expiry) return 0;
        const remaining = Math.round((Number(expiry) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
    }));


    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);



    const forgotPasswordAction = async (_: any, formData: FormData) => {
        const emailValue = formData.get('email') as string;
        try {
            await sendResetPasswordEmail.mutateAsync(emailValue);

            setCountdown(5 * 60);
            resetForm();
            return { error: null, success: t('successPasswordResetEmailSent') };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorSendingPasswordResetEmail') };
        }
    };

    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit, resetForm } = useActionForm({
        action: forgotPasswordAction,
        initialState: { email: '' },
        validate: (values) => {
            const errs: any = {};
            if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = t('errorInvalidEmail');
            return errs;
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-page-bg p-4 transition-colors">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl">

                <header className="text-center mb-8">
                    <img src={jcLogo} className='mx-auto mb-2' alt="JC Balance" width={48} />

                    <h1 className="text-3xl font-bold text-page-text tracking-tight ">
                        {t('appName')}
                    </h1>
                    <p className="text-sm text-page-text/60 mt-2">
                        {t('appTagline')}
                    </p>
                </header>


                <form action={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
                    <InputComponent
                        id="email"
                        name="email"
                        type="email"
                        label={t('labelEmail')}
                        placeholder={t('placeholderEmail')}
                        value={fields.email}
                        onChange={handleChange}
                        error={errors?.email || undefined}
                        required
                    />

                    {serverState?.error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                            {serverState.error}
                        </div>
                    )}

                    {serverState?.success && (
                        <div className="p-3 text-sm bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg">
                            {serverState.success}
                        </div>
                    )}

                    <ButtonComponent
                        type="submit"
                        arialLabel='forgot-password'
                        disabled={isPending || countdown > 0 || !isFormValid}
                        className='w-full'
                    >
                        {countdown > 0 ? (
                            <span className="font-mono">
                                {formatSecondsToTime(countdown)}
                            </span>
                        ) : isPending ? (
                            t('statusValidating')
                        ) : (
                            t('buttonSendLink')
                        )}
                    </ButtonComponent>
                </form>

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
            </div>
        </div>
    );
};