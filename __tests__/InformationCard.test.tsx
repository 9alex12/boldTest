import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InformationCard from "../components/InformationCard";

describe("InformationCard", () => {
  const props = {
    title: "Nequi",
    amount: 12345.67,
    date: "December 1, 2025",
  };

  it("renders the card with title, amount and date", () => {
    render(<InformationCard {...props} />);
    expect(screen.getByTestId("information-card")).toBeInTheDocument();
    expect(screen.getByTestId("information-card-title")).toHaveTextContent(`Total de ventas de ${props.title}`);
    expect(screen.getByTestId("information-card-amount")).toHaveTextContent("$ 12.345,67");
    expect(screen.getByTestId("information-card-date")).toHaveTextContent(props.date);
  });

  it("shows the tooltip when summary is clicked", () => {
    render(<InformationCard {...props} />);
    const summary = screen.getByTestId("information-card-summary");
    fireEvent.click(summary);
    expect(screen.getByTestId("information-card-tooltip")).toBeVisible();
    expect(screen.getByTestId("information-card-tooltip")).toHaveTextContent("Valor total de todas las transacciones");
  });

  it("hides the tooltip when details loses focus", () => {
    render(<InformationCard {...props} />);
    const details = screen.getByTestId("information-card-details");
    const summary = screen.getByTestId("information-card-summary");
    fireEvent.click(summary);
    fireEvent.blur(details);
    // Tooltip should not be visible after blur
    // This depends on implementation, so we check if details is closed
    expect(details.hasAttribute("open")).toBe(false);
  });
});
