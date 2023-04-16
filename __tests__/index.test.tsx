import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a text", () => {
    render(<Home />);

    const heading = screen.getByText("Hello Next.js");

    expect(heading).toBeInTheDocument();
  });
});
