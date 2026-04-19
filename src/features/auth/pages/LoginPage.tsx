import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import { ButtonComponent, InputComponent } from '@shared/components';
import jcLogo from '../../../assets/logo/jc_balance_icon.webp';
import { useActionForm } from '@shared/hooks';

export const LoginPage = () => {
    const { t } = useTranslation();
    const { login } = useAuth();

    const loginAction = async (_: any, formData: FormData) => {
        const username = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login.mutateAsync({ username, password });
            return { error: null, success: '' };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorInvalidCredentials') };
        }
    };


    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit } = useActionForm({
        action: loginAction,
        initialState: { email: '', password: '' },
        validate: (values) => {
            const errs: any = {};
            if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = t('errorInvalidEmail');
            if (values.password.length < 8) errs.password = t('errorPasswordShort');
            return errs;
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-page-bg p-4 transition-colors">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-xl">
                <img src={jcLogo} className='mx-auto mb-2' alt="JC Balance" width={48} />
                <header className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-page-text tracking-tight">
                        {t('appName')}
                    </h1>
                    <p className="text-sm text-page-text/60 mt-2">
                        {t('appTagline')}
                    </p>
                </header>

                <form action={handleSubmit} className="space-y-5">
                    <InputComponent
                        id="email"
                        name="email"
                        type="email"
                        label={t('labelEmail')}
                        placeholder={t('placeholderEmail')}
                        onChange={handleChange}
                        value={fields.email}
                        error={errors?.email || undefined}
                        required
                    />
                    <InputComponent
                        id="password"
                        name="password"
                        type="password"
                        label={t('labelPassword')}
                        placeholder={t('placeholderPassword')}
                        onChange={handleChange}
                        minLength={8}
                        error={errors?.password || undefined}
                        value={fields.password}
                        required
                    />


                    {serverState?.error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg animate-fade-in">
                            {serverState.error}
                        </div>
                    )}

                    <ButtonComponent
                        arialLabel='login'
                        type="submit"
                        disabled={isPending || !isFormValid}
                        className='w-full'
                    >
                        {isPending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-primary-text/30 border-t-primary-text rounded-full animate-spin" />
                                {t('statusValidating')}
                            </>
                        ) : (
                            t('buttonSignIn')
                        )}
                    </ButtonComponent>
                </form>

                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                    <p className="text-sm text-page-text/60">
                        {t('textNoAccount')}{' '}
                        <Link aria-label='link-register' className="font-bold text-secondary hover:text-secondary-hover transition-colors underline-offset-4 hover:underline cursor-pointer" to='/register'>
                            {t('linkRegister')}
                        </Link>
                    </p>
                </div>

                <footer className="mt-8 pt-6 border-t border-border/50 text-center">
                    <Link aria-label='link-forgot-password' className="text-xs font-medium text-secondary hover:text-secondary-hover transition-colors cursor-pointer" to='/forgot-password'>
                        {t('linkForgotPassword')}
                    </Link>
                </footer>
            </div>
        </div>
    );
};