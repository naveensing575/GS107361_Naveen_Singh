import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "../../pages/LoginPage";
import "@testing-library/jest-dom";

// Mock useAuth0 hook
jest.mock("@auth0/auth0-react");

describe("LoginPage Component", () => {
  it("renders login page with button", () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: jest.fn(),
    });

    render(<LoginPage />);

    expect(screen.getByText("Welcome to GSynergy")).toBeInTheDocument();
    expect(screen.getByText("Login with Auth0")).toBeInTheDocument();
  });

  it("calls loginWithRedirect when button is clicked", () => {
    const mockLoginWithRedirect = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    });

    render(<LoginPage />);

    fireEvent.click(screen.getByText("Login with Auth0"));
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });
});
