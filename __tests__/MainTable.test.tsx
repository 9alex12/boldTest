import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainTable from "../components/MainTable";

const mockSetSelectedTransaction = jest.fn();

const data = [
  {
    id: "tx1",
    status: "SUCCESSFUL",
    createdAt: 1701388800000, // 1 de diciembre de 2023
    paymentMethod: "CARD",
    transactionReference: 1234567890,
    amount: 1000,
    deduction: 100,
    salesType: "TERMINAL",
  },
  {
    id: "tx2",
    status: "REJECTED",
    createdAt: 1701475200000, // 2 de diciembre de 2023
    paymentMethod: "PSE",
    transactionReference: 9876543210,
    amount: 2000,
    deduction: undefined,
    salesType: "PAYMENT_LINK",
  },
];

describe("MainTable", () => {
  it("renders all rows and columns with correct data", () => {
    render(
      <MainTable data={data} title="Transactions" setSelectedTransaction={mockSetSelectedTransaction} />
    );
    data.forEach((item) => {
      expect(screen.getByTestId(`main-table-row-${item.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`main-table-status-${item.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`main-table-date-${item.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`main-table-reference-${item.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`main-table-id-${item.id}`)).toHaveTextContent(item.id);
      expect(screen.getByTestId(`main-table-amount-${item.id}`)).toBeInTheDocument();
    });
  });

  it("shows deduction if present", () => {
    render(
      <MainTable data={data} title="Transactions" setSelectedTransaction={mockSetSelectedTransaction} />
    );
    expect(screen.getByTestId("main-table-deduction-tx1")).toHaveTextContent("-$ 100");
  });

  it("calls setSelectedTransaction when a row is clicked", () => {
    render(
      <MainTable data={data} title="Transactions" setSelectedTransaction={mockSetSelectedTransaction} />
    );
    fireEvent.click(screen.getByTestId("main-table-row-tx1"));
    expect(mockSetSelectedTransaction).toHaveBeenCalledWith(data[0]);
  });

  it("filters rows by search query", () => {
    render(
      <MainTable data={data} title="Transactions" setSelectedTransaction={mockSetSelectedTransaction} />
    );
    const input = screen.getByPlaceholderText("Buscar");
    fireEvent.change(input, { target: { value: "tx2" } });
    expect(screen.queryByTestId("main-table-row-tx1")).not.toBeInTheDocument();
    expect(screen.getByTestId("main-table-row-tx2")).toBeInTheDocument();
  });
});
