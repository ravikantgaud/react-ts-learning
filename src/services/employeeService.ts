export const employeeService = {
    getEmployeeCount: () => {
        return 10;
    },

    getEmployees: async () => {
        const response = await fetch("/api/employees");

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        return response.json();
    }
};