import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TopNav from "../components/TopNav";
import "@testing-library/jest-dom";

// Mock useAuth0 hook
jest.mock("@auth0/auth0-react");

describe("TopNav Component", () => {
  const mockLoginWithRedirect = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct title based on route", () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: false,
    });

    const { rerender } = render(
      <MemoryRouter initialEntries={["/sku"]}>
        <TopNav />
      </MemoryRouter>
    );

    expect(screen.getByText("SKUs")).toBeInTheDocument();

    rerender(
      <MemoryRouter initialEntries={["/planning"]}>
        <TopNav />
      </MemoryRouter>
    );

    expect(screen.getByText("Planning")).toBeInTheDocument();
  });

  it("shows the login button when the user is not authenticated", () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
  });

  it("shows the logout button when the user is authenticated", () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      logout: mockLogout,
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <TopNav />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
