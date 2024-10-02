import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyDetailItem from "@/app/(defaults)/[id]/highlight-section/component";

describe("PropertyDetailItem", () => {
  it("should render the label and value correctly", () => {
    render(<PropertyDetailItem label="Bedrooms" value={3} />);

    const labelCell = screen.getByText("Bedrooms");
    const valueCell = screen.getByText("3");

    expect(labelCell).toBeInTheDocument();
    expect(valueCell).toBeInTheDocument();
  });

  it("should display label with correct text content", () => {
    render(<PropertyDetailItem label="Price" value="$500,000" />);

    const labelCell = screen.getByText("Price");

    expect(labelCell).toBeInTheDocument();
    expect(labelCell).toHaveTextContent("Price");
  });

  it("should display value with correct text content", () => {
    render(<PropertyDetailItem label="Area" value={1200} />);

    const valueCell = screen.getByText("1200");

    expect(valueCell).toBeInTheDocument();
    expect(valueCell).toHaveTextContent("1200");
  });

  it("should apply the correct CSS classes for table cells", () => {
    render(<PropertyDetailItem label="Location" value="New York" />);

    const labelCell = screen.getByText("Location").closest("td");
    const valueCell = screen.getByText("New York").closest("td");

    expect(labelCell).toHaveClass("border px-4 py-2 font-semibold");
    expect(valueCell).toHaveClass("border px-4 py-2");
  });
});
