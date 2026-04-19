import { useActionState, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from '../hooks';
import { CategorySelectComponent } from '@features/category/components';
import type { Transaction } from '../types';
import { useAuth } from '@features/auth/hooks';
import {  ButtonComponent, InputComponent, SelectComponent } from '@shared/components';
import { useSnackbar } from '@shared/hooks';

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const SetTransactionModal = ({ open, onClose, transaction, }: Props) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { createTransaction, updateTransaction } = useTransactions(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleAction = async (_: any, formData: FormData) => {
    const payload: Omit<Transaction, 'id'> = {
      name: formData.get('name') as string,
      amount: Number(formData.get('amount')),
      type: formData.get('type') as 'INCOME' | 'EXPENSE',
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      categoryId: formData.get('category') as string,
      categoryName: '',
      userId: user?.id ?? ''
    };

    try {
      if (transaction?.id) {
        await updateTransaction.mutateAsync({ id: transaction.id, data: payload });
      } else {
        await createTransaction.mutateAsync(payload);
      }

      onClose();
      showSnackbar(transaction ? t('transactionUpdated') : t('transactionAdded'), 'success');
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || t('errorTransactionFailed') };
    }
  };

  const [state, formAction, isPending] = useActionState(handleAction, { error: null });

  // 2. VALIDACIÓN (Igual que tu Login)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case 'name':
        if (!value.trim()) error = t('errorNameRequired'); // @NotBlank
        else if (value.length > 100) error = t('errorNameTooLong'); // @Size(max=100)
        break;

      case 'amount':
        if (!value || isNaN(Number(value))) error = t('errorAmountRequired');
        else if (Number(value) <= 0) error = t('errorAmountPositive');
        break;

      case 'description':
        if (value && value.length > 255) error = t('errorDescriptionTooLong');
        break;

      case 'categoryId':
        if (!value) error = t('errorCategoryRequired');
        break;

      case 'date':
        if (!value) error = t('errorDateRequired');
        break;
    }


    setErrors(prev => ({ ...prev, [name]: error }));
  };


  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="w-full max-w-lg bg-card border border-border p-8 rounded-2xl shadow-xl">

        <header className="mb-6">
          <h2 className="text-2xl font-bold text-page-text">
            {transaction ? t('updateTransaction') : t('addTransaction')}
          </h2>
        </header>

        <form action={formAction} className="space-y-4">
          <InputComponent
            name="name"
            label={t('concept')}
            defaultValue={transaction?.name || ""}
            onChange={handleChange}
            error={errors.name || undefined}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <InputComponent
              name="amount"
              type="number"
              label={t('amount')}
              defaultValue={transaction?.amount || ""}
              onChange={handleChange}
              error={errors.amount || undefined}
              required
            />


            <div className="flex flex-col">
              <SelectComponent label={t('type')} name='type' defaultValue={transaction?.type || "EXPENSE"}>
                <option value="INCOME">{t('income')}</option>
                <option value="EXPENSE">{t('expense')}</option>
              </SelectComponent>
            </div>
          </div>

          <InputComponent
            name="date"
            type="datetime-local"
            label={t('date')}
            defaultValue={transaction?.date ? transaction.date.slice(0, 16) : new Date().toISOString().slice(0, 16)}
            onChange={handleChange}
            required
          />

          <CategorySelectComponent
            initialCategoryId={transaction?.categoryId || ""} />


          {state?.error && (
            <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
              {state.error}
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
              disabled={isPending}
            >
              {isPending ? t('saving') : (transaction ? t('update') : t('create'))}
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};