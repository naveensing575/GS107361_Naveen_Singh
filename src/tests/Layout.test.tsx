import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../components/Layout";
import "@testing-library/jest-dom";

// Mocking child components
jest.mock("../components/TopNav", () => () => (
  <div data-testid="top-nav">TopNav</div>
));
jest.mock("../components/Sidebar", () => () => (
  <div data-testid="sidebar">Sidebar</div>
));

describe("Layout Component", () => {
  it("renders Sidebar and TopNav components", () => {
    render(
      <Layout>
        <div data-testid="child-component">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("top-nav")).toBeInTheDocument();
    expect(screen.getByTestId("child-component")).toBeInTheDocument();
  });

  it("displays the correct child content", () => {
    render(
      <Layout>
        <p>Test Child Content</p>
      </Layout>
    );

    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });
});
