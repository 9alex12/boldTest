import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "../components/Filter";

describe("Filter", () => {
  const options = [
    { label: "Option 1", value: "op1" },
    { label: "Option 2", value: "op2" },
    { label: "Option 3", value: "op3" },
  ];

  it("renders the component and displays the options", () => {
    render(<Filter options={options} onSubmit={jest.fn()} />);
    const summary = screen.getByTestId("filter-summary");
    expect(summary).toBeInTheDocument();
    fireEvent.click(summary);
    options.forEach((opt) => {
      expect(screen.getByTestId(`filter-option-label-${opt.value}`)).toBeInTheDocument();
      expect(screen.getByTestId(`filter-checkbox-${opt.value}`)).toBeInTheDocument();
    });
  });

  it("checks and unchecks options correctly", () => {
    render(<Filter options={options} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByTestId("filter-summary"));
    const checkbox = screen.getByTestId("filter-checkbox-op1") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it("applies the filter and calls onSubmit with the selected values", () => {
    const onSubmit = jest.fn();
    render(<Filter options={options} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByTestId("filter-summary"));
    fireEvent.click(screen.getByTestId("filter-checkbox-op1"));
    fireEvent.click(screen.getByTestId("filter-checkbox-op2"));
    fireEvent.click(screen.getByTestId("apply-filter-btn"));
    expect(onSubmit).toHaveBeenCalledWith(["op1", "op2"]);
  });

  it("closes the filter when clicking the close button", () => {
    render(<Filter options={options} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByTestId("filter-summary"));
    const closeBtn = screen.getByTestId("close-filter-btn");
    fireEvent.click(closeBtn);
    expect(screen.getByTestId("filter-details").hasAttribute("open")).toBe(false);
  });

  it("initializes the checkboxes with the given values", () => {
    render(<Filter options={options} onSubmit={jest.fn()} values={["op2"]} />);
    fireEvent.click(screen.getByTestId("filter-summary"));
    const checkbox = screen.getByTestId("filter-checkbox-op2") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
