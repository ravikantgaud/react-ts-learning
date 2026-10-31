import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EmployeeForm from "./EmployeeForm";
import { describe, test, expect } from "vitest";
import { afterEach } from "vitest";

afterEach(() => {
    cleanup();
});

describe("EmployeeForm", () => {
    test("adds a new employee when valid form is submitted", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "Ravi Gaud"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.getByText("ravi@example.com")).toBeInTheDocument();
        expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
        expect(screen.getByText("8 years")).toBeInTheDocument();
    });
    
    test("does not add an employee when form fields are empty", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);        

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(document.querySelector(".employee-Card")).not.toBeInTheDocument();
    });

    test("reset all inputs after adding an employee", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "Ravi Gaud"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByLabelText("Name:")).toHaveValue("");
        expect(screen.getByLabelText("Email:")).toHaveValue("");
        expect(screen.getByLabelText("Role:")).toHaveValue("");
        expect(screen.getByLabelText("Experience:")).toHaveValue(null);
    });

    test("does not add an employee when name field have whitespace only", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "  "
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.queryByText("  ")).not.toBeInTheDocument();
        expect(screen.queryByText("ravi@example.com")).not.toBeInTheDocument();
    });

    test("removes an employee when delete button is clicked", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "Ravi Gaud"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.getByText("ravi@example.com")).toBeInTheDocument();
        expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
        expect(screen.getByText("8 years")).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: "Delete" })
        );

        expect(screen.queryByText("Ravi Gaud")).not.toBeInTheDocument();
        expect(screen.queryByText("ravi@example.com")).not.toBeInTheDocument();
        expect(screen.queryByText("Senior React Developer")).not.toBeInTheDocument();
        expect(screen.queryByText("8 years")).not.toBeInTheDocument();

    });

    test("search an employee", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "Ravi Gaud"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.getByText("ravi@example.com")).toBeInTheDocument();
        expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
        expect(screen.getByText("8 years")).toBeInTheDocument();

        await user.type(
            screen.getByLabelText("Name:"),
            "Amit Sharma"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "amit@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Team Leader"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "18"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
        expect(screen.getByText("amit@example.com")).toBeInTheDocument();
        expect(screen.getByText("Team Leader")).toBeInTheDocument();
        expect(screen.getByText("18 years")).toBeInTheDocument();

        await user.type(
            screen.getByPlaceholderText("Search employee..."),
            "Ravi"
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.queryByText("Amit Sharma")).not.toBeInTheDocument();
    });

    test("search an employee case-insensitively", async () => {
        const user = userEvent.setup();

        render(<EmployeeForm />);

        await user.type(
            screen.getByLabelText("Name:"),
            "Ravi Gaud"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "ravi@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Senior React Developer"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "8"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.getByText("ravi@example.com")).toBeInTheDocument();
        expect(screen.getByText("Senior React Developer")).toBeInTheDocument();
        expect(screen.getByText("8 years")).toBeInTheDocument();

        await user.type(
            screen.getByLabelText("Name:"),
            "Amit Sharma"
        );

        await user.type(
            screen.getByLabelText("Email:"),
            "amit@example.com"
        );

        await user.type(
            screen.getByLabelText("Role:"),
            "Team Leader"
        );

        await user.type(
            screen.getByLabelText("Experience:"),
            "18"
        );

        await user.click(
            screen.getByRole("button", { name: "Add Employee" })
        );

        expect(screen.getByText("Amit Sharma")).toBeInTheDocument();
        expect(screen.getByText("amit@example.com")).toBeInTheDocument();
        expect(screen.getByText("Team Leader")).toBeInTheDocument();
        expect(screen.getByText("18 years")).toBeInTheDocument();

        await user.type(
            screen.getByPlaceholderText("Search employee..."),
            "rAvI"
        );

        expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
        expect(screen.queryByText("Amit Sharma")).not.toBeInTheDocument();
    });
});