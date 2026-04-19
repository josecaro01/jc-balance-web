import { useTranslation } from "react-i18next"
import type { Transaction } from "../types"
import { useTransactions } from "../hooks"
import { ButtonComponent } from "@shared/components"
import { useSnackbar } from "@shared/hooks"

interface Props {
  open: boolean
  transaction: Transaction | null
  onClose: () => void
}

export const DeleteTransactionModal = ({
  open,
  transaction,
  onClose
}: Props) => {

  const { t } = useTranslation();
  const { deleteTransaction } = useTransactions(null);
  const { showSnackbar } = useSnackbar();

  const onDelete = async () => {
    if (!transaction) return;

    try {
      await deleteTransaction.mutateAsync(transaction.id);
      showSnackbar(t("transactionDeleted"), "success");
      onClose();
    } catch (err: any) {
      showSnackbar(err?.message || t("errorTransactionDeleteFailed"), "error");
    }
  }

  if (!open || !transaction) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4">

        <h2 className="text-lg font-semibold">
          {t("deleteTransaction")}
        </h2>

        <p className="text-sm text-gray-500">
          {t("confirmTransactionDelete", { concept: transaction.name })}
        </p>

        <div className="flex justify-end gap-3">
          <ButtonComponent
            colorScheme="primary"
            variant="outlined"
            onClick={onClose}

          >
            {t("cancel")}
          </ButtonComponent>

          <ButtonComponent
            colorScheme="danger"
            onClick={() =>
              onDelete()
            }

          >
            {t("delete")}
          </ButtonComponent>
        </div>

      </div>
    </div >
  )
}