import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Homme from "./Home";

describe("Homme", () => {
  it("renders correctly", () => {
    render(<Homme />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
