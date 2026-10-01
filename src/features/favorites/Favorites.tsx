import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router";

type ApiUser = {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

type Employee = {
    id: number,
    name: string,
    email: string
}

type UsersResponse = {
    users: ApiUser[];
    total: number;
    skip: number;
    limit: number;
}

function Favorites() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [employees, setEmployees] = useState<Employee[]>([]);

    const mapApiUserToEmployee = (user:ApiUser):Employee => {
        return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
        }
    }
    
    const fetchEmployees = async (): Promise<UsersResponse> => {
        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
    
        return data;
    }

    const loadEmployees = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchEmployees();
    
            const mappedEmployees = data.users.map(mapApiUserToEmployee);
    
            setEmployees(mappedEmployees);        
        } catch(error) {
            setError(error instanceof Error ? error.message : "Something went wrong")
        } finally {
            setLoading(false);
        }

    }
    
    const favoriteEmployeeIds = useAppSelector(
        (state) => state.favorites.favoriteEmployeeIds
    );

    useEffect(() => {
        loadEmployees();
    }, [])

    const filteredEmployees = employees.filter((employee) => (
        favoriteEmployeeIds.includes(employee.id)
    ))

    const handleRetry = () => {
        loadEmployees();
    }

    if(loading){
        return <p>Loading favorite employees...</p>
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
            <h2>Favorite Employees</h2>
            {
                (filteredEmployees.length === 0) ? (
                    <p>No employee marked as favorite.</p>
                ): (
                    filteredEmployees.map((employee) => (
                        <div className="employee-card" key={employee.id}>
                            <p>ID: {employee.id}</p>
                            <p>Name: {employee.name}</p>
                            <Link to={`/employees/${employee.id}`}>View Details</Link>
                            <p>Email: {employee.email}</p>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Favorites;