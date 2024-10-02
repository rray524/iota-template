import { Pagination } from "@/components/pagination/pagination";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Pagination Component", () => {
  const paginateMock = jest.fn();

  beforeEach(() => {
    paginateMock.mockClear();
  });

  it("renders the Pagination component", () => {
    render(
      <Pagination currentPage={1} totalPages={10} paginate={paginateMock} />
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("displays the correct page numbers", () => {
    render(
      <Pagination currentPage={3} totalPages={10} paginate={paginateMock} />
    );

    // Check that the correct page numbers are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calls paginate with the correct page number when a page button is clicked", () => {
    render(
      <Pagination currentPage={3} totalPages={10} paginate={paginateMock} />
    );

    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);

    expect(paginateMock).toHaveBeenCalledWith(4);
  });

  it("calls paginate with the previous page number when the Previous button is clicked", () => {
    render(
      <Pagination currentPage={3} totalPages={10} paginate={paginateMock} />
    );
    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);
    expect(paginateMock).toHaveBeenCalledWith(2);
  });

  it("calls paginate with the next page number when the Next button is clicked", () => {
    render(
      <Pagination currentPage={3} totalPages={10} paginate={paginateMock} />
    );
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);
    expect(paginateMock).toHaveBeenCalledWith(4);
  });
});
