import React from "react";
import { render, screen } from "@testing-library/react";
import Results from "@/app/(defaults)/land-transfer/component";

describe("Results Component", () => {
  const mockProps = {
    totalTransferTax: 10000,
    provincialTax: 3000,
    municipalTax: 2000,
    rebateReturn: 500,
    notice: "",
  };

  it("renders without crashing", () => {
    render(<Results {...mockProps} />);
    expect(screen.getByText(/Results/i)).toBeInTheDocument();
  });

  it("displays formatted values correctly", () => {
    render(<Results {...mockProps} />);

    expect(screen.getByText("$10,000.00")).toBeInTheDocument();
    expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    expect(screen.getByText("$2,000.00")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  it("conditionally displays notice when provided", () => {
    const notice = "This is a notice message";
    render(<Results {...mockProps} notice={notice} />);

    expect(screen.getByText(notice)).toBeInTheDocument();
  });

  it("does not display notice when not provided", () => {
    render(<Results {...mockProps} notice="" />);

    expect(
      screen.queryByText(/This is a notice message/i)
    ).not.toBeInTheDocument();
  });
});
