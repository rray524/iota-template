import ToggleButton from "@/components/button/button-toggle";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ToggleButton Component", () => {
  it("renders the ToggleButton component", () => {
    render(<ToggleButton isChecked={false} handleChange={jest.fn()} />);
    const toggleButton = screen.getByRole("checkbox");
    expect(toggleButton).toBeInTheDocument();
  });

  it("displays the indicator in the correct position when checked", () => {
    render(<ToggleButton isChecked={true} handleChange={jest.fn()} />);
    const toggleIndicator = screen.getByTestId("toggle-indicator");
    expect(toggleIndicator).toHaveClass(
      "absolute inset-y-0 left-0 m-1 size-6 rounded-full bg-white transition-all duration-300 ease-in-out peer-checked:left-6"
    );
  });

  it("displays the indicator in the correct position when not checked", () => {
    render(<ToggleButton isChecked={false} handleChange={jest.fn()} />);
    const toggleIndicator = screen.getByTestId("toggle-indicator");
    expect(toggleIndicator).toHaveClass("left-0");
  });

  it("calls handleChange when the toggle is clicked", () => {
    const handleChange = jest.fn();
    render(<ToggleButton isChecked={false} handleChange={handleChange} />);
    const toggleButton = screen.getByRole("checkbox");
    fireEvent.click(toggleButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
