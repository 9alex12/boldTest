import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableTabs from "../components/TableTabs";

describe("TableTabs", () => {
  const options = [
    { label: "Tab 1", value: "tab1" },
    { label: "Tab 2", value: "tab2" },
    { label: "Tab 3", value: "tab3" },
  ];

  it("renders all tabs and inputs", () => {
    render(<TableTabs options={options} name="tabs" />);
    expect(screen.getByTestId("table-tabs")).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByTestId(`table-tab-label-${opt.value}`)).toHaveTextContent(opt.label);
      expect(screen.getByTestId(`table-tab-input-${opt.value}`)).toBeInTheDocument();
    });
  });

  it("checks the correct tab when defaultValue is set", () => {
    render(<TableTabs options={options} name="tabs" defaultValue="tab2" />);
    const input = screen.getByTestId("table-tab-input-tab2") as HTMLInputElement;
    expect(input.defaultChecked).toBe(true);
  });

  it("calls onChange when a tab is clicked", () => {
    const onChange = jest.fn();
    render(<TableTabs options={options} name="tabs" onChange={onChange} />);
    const input = screen.getByTestId("table-tab-input-tab3");
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
  });
});
