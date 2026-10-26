import { useEffect, useState, memo, useCallback, useMemo } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addFavorite, removeFavorite } from "./favorites/favoritesSlice";
import { selectFavoriteEmployeeIds } from "./favorites/favoritesSelectors";

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

const ApiEmployeeCard = memo(function ApiEmployeeCard({
        employee,
        isFavorite,
        onToggleFavorite,
    }: {
        employee: Employee;
        isFavorite: boolean;
        onToggleFavorite: (id: number, isFavorite: boolean) => void;
    }) {        
        return (
            <div>
                <h3>{employee.name}</h3>
                <p>{employee.email}</p>

                <button onClick={() => onToggleFavorite(employee.id, isFavorite)}>
                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
            </div>
        );
    });
    
function EmployeeApi() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async (): Promise<UsersResponse> => {
        const response = await fetch("https://dummyjson.com/users");

        if(!response.ok){
            throw new Error("Failed to fetch employees");
        }
        const data: UsersResponse = await response.json();
        
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

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => 
           employee.name.toLowerCase().includes(searchTerm.toLowerCase())
       );        
    }, [employees, searchTerm])

    const dispatch = useAppDispatch();

    const favoriteEmployeeIds = useAppSelector(selectFavoriteEmployeeIds);

    const handleToggleFavorite = useCallback(
        (employeeId: number, isFavorite: boolean) => {
            if (isFavorite) {
                dispatch(removeFavorite(employeeId));
            } else {
                dispatch(addFavorite(employeeId));
            }
        },
        [dispatch]
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
                        aria-label="Search employees"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
            </p>

            {
                (filteredEmployees.length === 0) ?
                (
                    <p>No employees found.</p>
                ) : (
                    filteredEmployees.map((employee) => {
                        const isFavorite = favoriteEmployeeIds.includes(employee.id);

                        return (
                            <ApiEmployeeCard
                                key={employee.id}
                                employee={employee}
                                isFavorite={isFavorite}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        )
                    }) 
                )
            }
        </div>
    )
}

export default EmployeeApi;