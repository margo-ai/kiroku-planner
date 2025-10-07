import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import { LoginPage } from "@/pages/LoginPage";

import { UserData } from "../../model/types";

const mockUserData = {
  uid: "lI1JKa5ZCXaSgORBVjIJeqN55Dz2",
  email: "testemail@gmail.com",
  name: "Питер Паркер",
  photo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS_Qz7Adur2qhhBl-8ji61g4d2iq_vq_qkAQ&s"
};

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("@/app/providers/AuthProvider/AuthProvider", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

const mockSignIn = vi.fn();

vi.mock("@/config/firebase", () => ({
  auth: {}
}));

let mockUser: UserData | null = null;
vi.mock("@/features/Auth/model/services/authContext", () => ({
  useAuthContext: () => ({
    user: mockUser,
    signIn: mockSignIn,
    error: null
  })
}));

describe("Форма авторизации", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });

  test("Проверка наличия формы на странице авторизации и редиректа на страниицу регистрации по кнопке", async () => {
    const form = screen.getByTestId("login-form");
    expect(form).toBeInTheDocument();

    const redirectBtn = screen.getByTestId("redirect-to-registration");
    expect(redirectBtn).toBeInTheDocument();
    userEvent.click(redirectBtn);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/registration");
    });
  });

  test("Проверка наличия формы на странице авторизации, заполнения полей и её отправки", async () => {
    const fillAndSubmitBtn = (email: string, password: string) => {
      const emailInput = screen.getByTestId("email-input");
      const passwordInput = screen.getByTestId("password-input");
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });

      const submitBtn = screen.getByTestId("sign-in-button");
      fireEvent.click(submitBtn);
    };

    const form = screen.getByTestId("login-form");
    expect(form).toBeInTheDocument();

    mockSignIn.mockResolvedValue({
      user: mockUserData
    });

    fillAndSubmitBtn("testemail@gmail.com", "testpassword");

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("testemail@gmail.com", "testpassword");
      expect(mockSignIn).toHaveBeenCalledTimes(1);
    });
  });
});
