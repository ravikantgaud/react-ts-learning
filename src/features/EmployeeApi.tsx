import { useEffect, useState } from "react";

type ApiUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
} 

type Employee = {
    id: number;
    name: string;
    email: string;
}

type UsersResponse = {
    users: ApiUser[];
    total: number;
    skip: number;
    limit: number;
}

function EmployeeApi() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async (): Promise<EmployeesResponse> => {
        const response = await fetch("https://dummyjson.com/users");

        if(!response.ok){
            throw new Error("Failed to fetch employees");
        }
        const data: EmployeesResponse = await response.json();

        console.log(data);
        
        return data;
    }

    const mapApiUserToEmployee = (user: ApiUser): Employee => {
        return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        };
    };

    const loadEmployees = async () => {
        try{
            setLoading(true);
            setError(null);

            const data = await fetchEmployees();
            
            const employee = data.users.map(mapApiUserToEmployee)
            
            setEmployees(employee);
        } catch (error){
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleRetry = () => {
        loadEmployees();
    }

    const filteredEmployees = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if(loading){
        return <p>Loading employees...</p>
    }

    if(error){
        return (
            <div>
                <p>Error: {error}</p>
                <button type="button" onClick={handleRetry}>Retry</button>
            </div>
        )
    }

    return (
        <div>
            <h2>Employees from API ({employees.length})</h2>

            <p>Search: 
                <input type="text"
                        name="search"
                        placeholder="Search employee..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
            </p>

            {
                (filteredEmployees.length === 0) ?
                (
                    <p>No employees found.</p>
                ) : (
                    filteredEmployees.map((employee) => (
                        <div className="employee-Card" key={employee.id}>
                            <p>ID: {employee.id}</p>
                            <p>Name: {employee.name}</p>
                            <p>Email: {employee.email}</p>
                        </div>
                    ))  
                )
            }
        </div>
    )
}

export default EmployeeApi;