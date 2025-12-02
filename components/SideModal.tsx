import { useEffect, useRef } from "react";
import { Transaction } from "@/app/page";
import {
  TEXT_STATUS,
  iconByPaymentMethod,
  IconBySalesType,
} from "@/utils/constants";
import { formatDate, formatMoney, addAsterisks } from "@/utils/formaters";
import SuccessBadge from "./icons/Succesful";
import ErrorBadge from "./icons/Reject";

const SideModal = ({
  selectedTransaction,
  setSelectedTransaction,
}: {
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    amount,
    createdAt,
    status,
    id,
    deduction,
    paymentMethod,
    salesType,
    transactionReference,
  } = selectedTransaction || {};

  const modalInformationData = [
    {
      label: "ID transacción Bold",
      value: id,
    },
    {
      label: "Deducción Bold",
      value: deduction ? `- ${formatMoney(deduction)}` : "-",
      style: deduction ? "text-bold-red" : "",
    },
    {
      label: "Método de pago",
      value: addAsterisks(transactionReference as number),
      iconName: paymentMethod,
    },
    {
      label: "Tipo de pago",
      value: salesType === "PAYMENT_LINK" ? "Link de pagos" : "Terminal",
      iconName: salesType,
    },
  ];

  const iconsArray = {
    ...iconByPaymentMethod,
    ...IconBySalesType,
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedTransaction?.id) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) dialog.close();
    }
  }, [selectedTransaction]);

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedTransaction(null);
  };

  return (
    <dialog
      ref={dialogRef}
      className="m-0 transition-all duration-300 starting:translate-x-full translate-x-0 left-auto p-0 top-0 right-0 max-h-screen h-full w-1/3 bg-white border-none backdrop:bg-black/40 rounded-lg"
      data-testid="side-modal"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          closeModal();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute h-full w-full rounded-l-lg shadow-xl"
        data-testid="side-modal-content"
      >
        <button
          onClick={closeModal}
          className="px-3 py-1 rounded absolute top-4 right-4 cursor-pointer text-xl font-semibold"
          data-testid="side-modal-close-btn"
        >
          X
        </button>
        <div className="w-1/2 m-auto text-center mt-24 mb-16 flex flex-col items-center" data-testid="side-modal-header">
          {status === "SUCCESSFUL" ? <SuccessBadge data-testid="side-modal-success-icon" /> : <ErrorBadge data-testid="side-modal-error-icon" />}
          <h2 className="text-xl font-semibold mt-2" data-testid="side-modal-status">
            ¡{TEXT_STATUS[status as keyof typeof TEXT_STATUS]}!
          </h2>
          <span className="text-bold-blue font-bold text-3xl" data-testid="side-modal-amount">
            {amount && formatMoney(amount)}
          </span>
          <p className="mt-2 text-gray-600" data-testid="side-modal-date">
            {createdAt && formatDate(createdAt)}
          </p>
        </div>
        <div className="[&>*:nth-child(2)]:border-b [&>*:nth-child(2)]:border-[#6D6D6D] mx-6" data-testid="side-modal-info-list">
          {modalInformationData.map((item) => {
            const PaymentIconComponent =
              iconsArray[item.iconName as keyof typeof iconsArray];
            return (
              <div key={item.label} className="flex justify-between px-4 py-2" data-testid={`side-modal-info-row-${item.label}`}>
                <p className="text-gray-500 text-sm" data-testid={`side-modal-info-label-${item.label}`}>{item.label}</p>
                <span
                  className={`font-semibold flex gap-2 ${item.style || ""}`}
                  data-testid={`side-modal-info-value-${item.label}`}
                >
                  {item.iconName && (
                    <PaymentIconComponent className="inline-block mr-2" data-testid={`side-modal-info-icon-${item.label}`} />
                  )}
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};

export default SideModal;
