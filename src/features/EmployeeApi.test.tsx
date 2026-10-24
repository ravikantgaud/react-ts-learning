import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import EmployeeApi from "./EmployeeApi";
import { Provider } from "react-redux";
import { store } from "../app/store";
import userEvent from "@testing-library/user-event";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

test("displays loading message while API request is pending", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
        () => new Promise<Response>(() => {})
    );

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    expect(
        screen.getByText("Loading employees...")
    ).toBeInTheDocument();
})

test("displays employees when API request succeeds", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 101,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com",
                },
                {
                    id: 102,
                    firstName: "Priya",
                    lastName: "Sharma",
                    email: "priya@example.com"
                },
            ],
            total: 2,
            skip: 0,
            limit: 2,
        }),
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();
    expect(screen.getByText("ravi@example.com")).toBeInTheDocument();

    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();
    expect(screen.getByText("priya@example.com")).toBeInTheDocument();

    expect(screen.getByText("Employees from API (2)")).toBeInTheDocument();
});

test("displays error message when API request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 500
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" }));
});

test("retries API request when Retry button is clicked", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch");

    fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500
    } as Response);

    fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 201,
                    firstName: "Anita",
                    lastName: "Sharma",
                    email: "anita@example.com"
                },
            ],
            total: 1,
            skip: 0,
            limit: 1
        })
    } as Response)

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    )

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument();
    await user.click(
        screen.getByRole("button", { name: "Retry" })
    );

    expect(screen.getByText("Anita Sharma")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("filters employees when the user searches by name", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 301,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com",
                },
                {
                    id: 302,
                    firstName: "Priya",
                    lastName: "Sharma",
                    email: "priya@example.com"
                }
            ],
            total: 2,
            skip: 0,
            limit: 2,
        }),
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    //Wait until the API data is displayed.
    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();
    expect(screen.getByText("Priya Sharma")).toBeInTheDocument();

    await user.type(
        screen.getByRole("textbox", { name: "Search employees" }),
        "Ravi"
    );

    //Only Ravi should remain visible.
    expect(screen.getByText("Ravi Gaud")).toBeInTheDocument();
    expect(screen.queryByText("Priya Sharma")).not.toBeInTheDocument();
});

test("displays no employees found when search has no matches", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 401,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com",
                },
            ],
            total: 1,
            skip: 0,
            limit: 1
        })
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();

    await user.type(
        screen.getByRole("textbox", { name: "Search employees" }),
        "XYZ"
    );

    expect(screen.queryByText("Ravi Gaud")).not.toBeInTheDocument();
    expect(screen.getByText("No employees found.")).toBeInTheDocument();
});

test("searches employees case-insensitively", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 501,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com",
                },
            ]
        })
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();
    await user.type(
        screen.getByRole("textbox", { name: "Search employees" }),
        "ravi"
    );

    expect(screen.queryByText("Ravi Gaud")).toBeInTheDocument();
});

test("adds and remove an employee from favorites", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 601,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com",
                },
            ],
            total: 1,
            skip: 0,
            limit: 1,
        }),
    } as Response);

    render(
        <Provider store={store}>
            <EmployeeApi />
        </Provider>
    );

    // Wait until the API employee appears
    await screen.findByText("Ravi Gaud");

    // Step 1: Add to favorites
    await user.click(
        screen.getByRole("button", { name: "Add Favorite" })
    );

    expect(
        screen.getByRole("button", { name: "Remove Favorite" })
    ).toBeInTheDocument();

    // Step 2: Remove from favorites
    await user.click(
        screen.getByRole("button", { name: "Remove Favorite" })
    )

    expect(
        screen.getByRole("button", { name: "Add Favorite" })
    ).toBeInTheDocument();
});