import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonComponent, InputComponent } from '@shared/components';
import type { RegisterCredentials } from '../types';
import jcLogo from '../../../assets/logo/jc_balance_icon.webp';
import { useActionForm } from '@shared/hooks';



export const RegisterPage = () => {

    const { t } = useTranslation();
    const { register } = useAuth();
    const navigate = useNavigate();

    async function registerAction(_prevState: any, formData: FormData) {
        try {

            const data: RegisterCredentials = { name: formData.get('name') as string, lastName: formData.get('lastName') as string, email: formData.get('email') as string, password: formData.get('password') as string };
            await register.mutateAsync(data);
            resetForm();
            return { success: t('accountCreatedSuccess'), error: null, };
        } catch (err: any) {
            return { success: null, error: err?.message || t('errorAccountCreation') };
        }
    }

    const { fields, errors, serverState, isPending, isFormValid, handleChange, handleSubmit, resetForm } = useActionForm({
        action: registerAction,
        initialState: { name: '', lastName: '', email: '', password: '' },
        validate: (values) => {
            const errs: any = {};
            if (!values.name.trim()) errs.name = t('errorFirstNameRequired');
            if (!values.lastName.trim()) errs.lastName = t('errorLastNameRequired');
            if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = t('errorInvalidEmail');
            if (values.password.length < 8) errs.password = t('errorPasswordShort');
            return errs;
        }
    });

    useEffect(() => {
        if (serverState.success) {
            setTimeout(() => navigate('/login'), 1500);
        }
    }, [serverState.success, navigate]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-page-bg p-4">
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

                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <InputComponent
                                label={t('labelFirstName')}
                                name="name"
                                required
                                onChange={handleChange}
                                value={fields.name}
                                placeholder={t('labelFirstName')}
                                error={errors.name || undefined}
                            />


                        </div>
                        <div className="space-y-2">
                            <InputComponent
                                label={t('labelLastName')}
                                name="lastName"
                                required
                                onChange={handleChange}
                                value={fields.lastName}
                                placeholder={t('labelLastName')}
                                error={errors.lastName || undefined}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <InputComponent
                            id="email"
                            name="email"
                            type="email"
                            label={t('labelEmail')}
                            placeholder={t('placeholderEmail')}
                            onChange={handleChange}
                            value={fields.email}
                            error={errors.email || undefined}
                            required
                        />

                    </div>

                    <div className="space-y-2">
                        <InputComponent
                            id="password"
                            name="password"
                            type="password"
                            label={t('labelPassword')}
                            placeholder={t('placeholderPassword')}
                            minLength={8}
                            onChange={handleChange}
                            value={fields.password}
                            error={errors.password || undefined}
                            required
                        />
                    </div>

                    {serverState?.error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg animate-fade-in ">
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
                        aria-label='register'
                        disabled={!isFormValid || isPending}
                        className='w-full'
                    >

                        {isPending ? t('statusCreatingAccount') : t('buttonRegister')}
                    </ButtonComponent>
                </form>
                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                    <p className="text-sm text-page-text/60">
                        {t('textHaveAccount')}{' '}
                        <Link aria-label='link-login' className="font-bold text-secondary hover:text-secondary-hover transition-colors underline-offset-4 hover:underline cursor-pointer" to='/login'>
                            {t('linkSignUp')}
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};