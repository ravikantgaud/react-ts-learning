import { screen, cleanup, within, waitFor, render, fireEvent } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import EmployeeApi from "./EmployeeApi";
import { renderWithProviders } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import { mockEmployees, mockAnita } from "../test/mockEmployees";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

function createDeferred<T>() {
    let resolve!: (value: T) => void;

    const promise = new Promise<T>((res) => {
        resolve = res;
    });

    return { promise, resolve };
}

test("displays loading message while API request is pending", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
        () => new Promise<Response>(() => {})
    );

    renderWithProviders(<EmployeeApi />);

    expect(
        screen.getByText("Loading employees...")
    ).toBeInTheDocument();
})

test("displays employees when API request succeeds", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: mockEmployees,
            total: 2,
            skip: 0,
            limit: 2,
        }),
    } as Response);

    renderWithProviders(<EmployeeApi />);

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

    renderWithProviders(<EmployeeApi />);

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
            users: [mockAnita],
            total: 1,
            skip: 0,
            limit: 1
        })
    } as Response)

    renderWithProviders(<EmployeeApi />);

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument();
    await user.click(
        screen.getByRole("button", { name: "Retry" })
    );

    expect(screen.getByText("Anita Sharma")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("filters employees when the user searches by name", async () => {
    const mockFetch = vi.spyOn(globalThis, "fetch");

    mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 101,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com"
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
        })
    } as Response)
    .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 101,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com"
                },
            ],
            total: 1,
            skip: 0,
            limit: 1,
        })
    } as Response)

    renderWithProviders(<EmployeeApi />);

    //Wait until the API data is displayed.
    await screen.findByText("Priya Sharma");

    const searchInput = screen.getByRole("textbox", { name: "Search employees", });

    fireEvent.change(searchInput, { target: { value: "Ravi" } });

    //Only Ravi should remain visible.
    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText("Priya Sharma")).not.toBeInTheDocument();
    });
});

test("displays no employees found when search has no matches", async () => {
    const user = userEvent.setup();

    const mockFetch = vi.spyOn(globalThis, "fetch");
    
    mockFetch.mockResolvedValueOnce({
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
            limit: 1,
        }),
    } as Response)
    .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [],
            total: 0,
            skip: 0,
            limit: 0,
        }),
    } as Response);

    renderWithProviders(<EmployeeApi />);

    await screen.findByText("Ravi Gaud");

    const searchInput = screen.getByRole("textbox", { name: "Search employees", });

    fireEvent.change(searchInput, { target: { value: "Unknown" }, });

    expect(await screen.findByText("No employees found.")).toBeInTheDocument();
    expect(screen.queryByText("Ravi Gaud")).not.toBeInTheDocument();
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

    renderWithProviders(<EmployeeApi />);

    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();
    await user.type(
        screen.getByRole("textbox", { name: "Search employees" }),
        "ravi"
    );

    expect(screen.queryByText("Ravi Gaud")).toBeInTheDocument();
});

test("adds and removes an employee from favorites", async () => {
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

    renderWithProviders(<EmployeeApi />);

    // Wait until the API employee appears
    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();

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

test("displays loading while retry request is pending", async () => {
    const user = userEvent.setup();
    
    const mock = vi.spyOn(globalThis, "fetch");
    mock.mockResolvedValueOnce({
        ok: false,
        status: 500,
    } as Response);

    mock.mockImplementationOnce(
        () => new Promise<Response>(() => {})
    );

    renderWithProviders(<EmployeeApi />);

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument()
    expect(screen.getByRole("button", { name : "Retry" })).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Retry" })
    );

    expect(
        screen.queryByText("Error: Failed to fetch employees")
    ).not.toBeInTheDocument();

    expect(
        await screen.findByText("Loading employees...")
    ).toBeInTheDocument();
});

test("clears error and displays employees after successful retry", async () => {
    const user = userEvent.setup();
    
    const mock = vi.spyOn(globalThis, "fetch");
    mock.mockResolvedValueOnce({
        ok: false,
        status: 500,
    } as Response);

    mock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 701,
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

    renderWithProviders(<EmployeeApi />);

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument()
    expect(screen.getByRole("button", { name : "Retry" })).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Retry" })
    );
    
    expect(await screen.findByText("Anita Sharma")).toBeInTheDocument();
    
    expect(
        screen.queryByText("Error: Failed to fetch employees")
    ).not.toBeInTheDocument();

    expect(
        screen.queryByText("Loading employees...")
    ).not.toBeInTheDocument();
});

test("adds and remove an employee to favorites", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 101,
                    firstName: "Emily",
                    lastName: "Johnson",
                    email: "emily@example.com",
                },
            ],
            total: 1,
            skip: 0,
            limit: 1,
        }),
    } as Response);

    const { store } = renderWithProviders(<EmployeeApi />);

    const employeeName = await screen.findByText("Emily Johnson");

    const employeeCard = employeeName.closest("div");

    const addFavoriteButton = within(employeeCard!).getByRole("button", { name: "Add Favorite" });

    expect(
        await screen.findAllByRole("button", { name: "Add Favorite" })
    ).toHaveLength(1);

    expect(
        store.getState().favorites.favoriteEmployeeIds
    ).not.toContain(101);

    await user.click(addFavoriteButton);

    expect(
        within(employeeCard!).getByRole("button", {
            name: "Remove Favorite",
        })
    ).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Remove Favorite" })
    );

    expect(
        store.getState().favorites.favoriteEmployeeIds
    ).not.toContain(101);

    expect(
        within(employeeCard!).getByRole("button", {
            name: "Add Favorite",
        })
    ).toBeInTheDocument();
});

test("verify the loading message disappears after a successful API response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 801,
                    firstName: "Ravi",
                    lastName: "Gaud",
                    email: "ravi@example.com"
                },
            ],
            total: 1,
            skip: 0,
            limit: 1
        })
    } as Response)

    renderWithProviders(<EmployeeApi />);

    expect(
        screen.getByText("Loading employees...")
    ).toBeInTheDocument();
    
    expect(await screen.findByText("Ravi Gaud")).toBeInTheDocument();    

    await waitFor(() => {
        expect(
            screen.queryByText("Loading employees...")
        ).not.toBeInTheDocument();
    });
});

test("displays error message when API request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 500
    } as Response);

    renderWithProviders(<EmployeeApi />);

    expect(screen.getByText("Loading employees...")).toBeInTheDocument();
    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument();
    await waitFor(() => {
        expect(
            screen.queryByText("Loading employees...")
        ).not.toBeInTheDocument();
    });
});

test("clears error and displays employees after successful retry", async () => {
    const user = userEvent.setup();
    
    const mock = vi.spyOn(globalThis, "fetch");
    mock.mockResolvedValueOnce({
        ok: false,
        status: 500,
    } as Response);

    mock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 901,
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

    renderWithProviders(<EmployeeApi />);

    expect(await screen.findByText("Error: Failed to fetch employees")).toBeInTheDocument()
    expect(screen.getByRole("button", { name : "Retry" })).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", { name: "Retry" })
    );
    
    expect(await screen.findByText("Anita Sharma")).toBeInTheDocument();
    expect(mock).toHaveBeenCalledTimes(2);
    
    expect(
        screen.queryByText("Error: Failed to fetch employees")
    ).not.toBeInTheDocument();

    await waitFor(() => {
        expect(
            screen.queryByText("Loading employees...")
        ).not.toBeInTheDocument();
    });    
});

test("abort the controller", async () => {
    const abortSpy = vi.fn();

    const NativeAbortController = globalThis.AbortController;

    class MockAbortController extends NativeAbortController{
        abort(reason?: any) {
            abortSpy();
            super.abort(reason);
        }
    }

    const realController = new AbortController();

    vi.spyOn(globalThis, "AbortController").mockImplementation(MockAbortController);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 1001,
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

    const { unmount } = renderWithProviders(<EmployeeApi />);

    unmount();    

    expect(abortSpy).toHaveBeenCalled();
});

test("displays the latest search result when API responses arrive out of order", async () => {
    const raviRequest = createDeferred<Response>();
    const anitaRequest = createDeferred<Response>();

    const mockFetch = vi.spyOn(globalThis, "fetch");

    mockFetch.mockImplementation((input) => {
        const url = String(input);

        if(url.includes("q=Ravi")) {
            return raviRequest.promise;
        }

        if(url.includes("q=Anita")) {
            return anitaRequest.promise;
        }

        return Promise.resolve({
            ok: true,
            json: async () => ({
                users: [],
                total: 0,
                skip: 0,
                limit: 0,
            }),
        } as Response);
    });

    const user = userEvent.setup();

    renderWithProviders(<EmployeeApi />);

    // Wait for initial API loading to finish
    await waitFor(() => {
        expect(screen.queryByText("Loading employees...")).not.toBeInTheDocument();
    });

    const searchInput = screen.getByRole("textbox", {
        name: "Search employees",
    });

    // Start Ravi's request
    fireEvent.change(searchInput, {
        target: { value: "Ravi" },
    });

    // Start Anita's request
    fireEvent.change(searchInput, {
        target: { value: "Anita" },
    });

    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    //Resolve Anita's request first
    anitaRequest.resolve({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 1202,
                    firstName: "Anita",
                    lastName: "Sharma",
                    email: "anita@example.com",
                },
            ],
            total: 1,
            skip: 0,
            limit: 1,
        }),
    } as Response);

    expect(await screen.findByText("Anita Sharma")).toBeInTheDocument();

    //Resolve Ravi's older request afterward
    raviRequest.resolve({
        ok: true,
        json: async () => ({
            users: [
                {
                    id: 1201,
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

    // Anita should remain visible
    expect(screen.getByText("Anita Sharma")).toBeInTheDocument();

    // Ravi's outdated result must not appear
    expect(screen.queryByText("Ravi Gaud")).not.toBeInTheDocument();
});