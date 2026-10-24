import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import EmployeeCard from "./EmployeeCard";
import userEvent from "@testing-library/user-event";

afterEach(() => {
    cleanup();
});

test("displays employee information correctly", () => {
    render(
        <EmployeeCard 
            name="Ravi Gaud"
            department="Engineering"
            experience={8}
            isActive={true}
        />
    );

    expect(screen.getByText("Name: Ravi Gaud")).toBeInTheDocument();
    expect(screen.getByText("Department: Engineering")).toBeInTheDocument();
    expect(screen.getByText("Experience: 8 years")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.queryByText("Inactive")).not.toBeInTheDocument();
});

test("displays Inactive when isActive is false", () => {
    render(
        <EmployeeCard 
            name="Ravikant Gaud"
            department="Engineering 1"
            experience={18}
            isActive={false}
        />
    );

    expect(screen.getByText("Name: Ravikant Gaud")).toBeInTheDocument();
    expect(screen.getByText("Department: Engineering 1")).toBeInTheDocument();
    expect(screen.getByText("Experience: 18 years")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
});

test("test the employee status when clicked", async () => {
    const user = userEvent.setup();

    render(
        <EmployeeCard
            name="Ravi Gaud"
            department="Engineering"
            experience={8}
            isActive={true}
        />
    );

    expect(screen.getByText("Active")).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Toggle Status" })
    );

    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.queryByText("Active")).not.toBeInTheDocument();
});

test("check whether the status can switch back correctly", async () => {
    const user = userEvent.setup();

    render(
        <EmployeeCard
            name="Ravi Gaud"
            department="Engineering"
            experience={8}
            isActive={true}
        />
    );

    expect(screen.getByText("Active")).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Toggle Status" })
    );

    expect(screen.getByText("Inactive")).toBeInTheDocument();
    expect(screen.queryByText("Active")).not.toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Toggle Status" })
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.queryByText("Inactive")).not.toBeInTheDocument();
})