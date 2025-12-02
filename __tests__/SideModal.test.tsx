import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideModal from "../components/SideModal";
import { Transaction } from "../app/page";

// Mock dialog methods for JSDOM
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});

describe("SideModal", () => {
  const transaction: Transaction = {
    id: "tx1",
    status: "SUCCESSFUL",
    createdAt: "2025-12-01T12:00:00Z",
    paymentMethod: "CARD",
    transactionReference: "1234567890",
    amount: 1000,
    deduction: 100,
    salesType: "NEQUI",
  };

  it("renders modal with transaction data", () => {
    render(
      <SideModal selectedTransaction={transaction} setSelectedTransaction={jest.fn()} />
    );
    expect(screen.getByTestId("side-modal")).toBeInTheDocument();
    expect(screen.getByTestId("side-modal-header")).toBeInTheDocument();
    expect(screen.getByTestId("side-modal-status")).toHaveTextContent("¡Cobro exitoso!");
    expect(screen.getByTestId("side-modal-amount")).toHaveTextContent("$ 1.000");
    expect(screen.getByTestId("side-modal-date")).toBeInTheDocument();
    expect(screen.getByTestId("side-modal-info-list")).toBeInTheDocument();
    expect(screen.getByTestId("side-modal-info-label-ID transacción Bold")).toHaveTextContent("ID transacción Bold");
    expect(screen.getByTestId("side-modal-info-value-ID transacción Bold")).toHaveTextContent("tx1");
    expect(screen.getByTestId("side-modal-info-label-Deducción Bold")).toHaveTextContent("Deducción Bold");
    expect(screen.getByTestId("side-modal-info-value-Deducción Bold")).toHaveTextContent("- $ 100");
  });

//   it("renders error icon if status is not SUCCESSFUL", () => {
//     const failedTx = { ...transaction, status: "FAILED" };
//     render(
//       <SideModal selectedTransaction={failedTx} setSelectedTransaction={jest.fn()} />
//     );
//     expect(screen.getByTestId("side-modal-error-icon")).toBeInTheDocument();
//   });

  it("calls setSelectedTransaction(null) when close button is clicked", () => {
    const setSelectedTransaction = jest.fn();
    render(
      <SideModal selectedTransaction={transaction} setSelectedTransaction={setSelectedTransaction} />
    );
    fireEvent.click(screen.getByTestId("side-modal-close-btn"));
    expect(setSelectedTransaction).toHaveBeenCalledWith(null);
  });

  it("does not render modal if selectedTransaction is null", () => {
    render(
      <SideModal selectedTransaction={null} setSelectedTransaction={jest.fn()} />
    );
    expect(screen.queryByTestId("side-modal")).not.toBeVisible();
  });
});
