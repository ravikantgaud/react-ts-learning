import { describe, it, expect, vi, afterEach } from "vitest";
import { employeeService } from "./employeeService";

afterEach(() => {
    vi.resetAllMocks();
});

describe("employeeService", () => {
    it("should spy on and restore getEmployeeCount", () => {
        // 1. Create a spy
        const spy = vi.spyOn(employeeService, "getEmployeeCount");

        // 2. Override the original return value
        spy.mockReturnValue(25);

        // 3. Verify the mocked implementation
        expect(employeeService.getEmployeeCount()).toBe(25);

        // 4. Verify the spy tracked the call
        expect(spy).toHaveBeenCalledTimes(1);

        // 5. Restore the original implementation
        //spy.mockRestore();

        // 6. Verify the original implementation
        //expect(employeeService.getEmployeeCount()).toBe(10);
    });
    
    it("should return employees from the API", async () => {
    
        // 1. Mock employee data
        const mockEmployees = [
            { id: 1, name: "Ravi" },
            { id: 2, name: "Anita" }
        ]
    
        // 2. Spy on the existing fetch function
        const fetchSpy = vi.spyOn(globalThis, "fetch")
        
        //3. Mocka successful API response
        fetchSpy.mockResolvedValue({
            ok: true,
            json: async () => mockEmployees
        } as Response);
    
        // 4. Call the actual service method
        const result = await employeeService.getEmployees();
    
        // 5. Verify the returned data
        expect(result).toEqual(mockEmployees);
    
        // 6. Verify fetch was called correctly
        expect(fetchSpy).toHaveBeenCalledWith("/api/employees");
        expect(fetchSpy).toHaveBeenCalledTimes(1);

        // 7. Restore the original fetch implementation
        //fetchSpy.mockRestore();
    });
    
    it("should return error when the API fails", async () => {
    
        // 1. Spy on the existing fetch function
        const fetchSpy = vi.spyOn(globalThis, "fetch")
        
        //2. Mocka an unsuccessful HTTP response
        fetchSpy.mockResolvedValue({
            ok: false,
            json: async () => []
        } as Response);
    
        // 3. Call the actual service method
        await expect(employeeService.getEmployees()).rejects.toThrow("Failed to fetch employees");
    });
});