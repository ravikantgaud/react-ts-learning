import { useEffect, useState, memo, useCallback, useMemo } from "react";
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

    const fetchEmployees = async (searchTerm: string, signal: AbortSignal): Promise<UsersResponse> => {
        const query = searchTerm.trim();

        const url = query ? `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}` : "https://dummyjson.com/users";

        const response = await fetch(url, { signal });

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

function EmployeeApi() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [retryCount, setRetryCount] = useState(0);


    const loadEmployees = async (searchTerm: string, signal: AbortSignal, isActive: () => boolean) => {
        try{
            if(searchTerm.trim()) {
                setIsSearching(true);
            } else{
                setLoading(true);
            }
            setError(null);

            const data = await fetchEmployees(searchTerm, signal);
            if(isActive()){
                const employee = data.users.map(mapApiUserToEmployee)
                
                setEmployees(employee);
            }
        } catch (error){
            if(!isActive()) return;

            if (error instanceof Error && error.name === "AbortError") {
                // Ignore intentional cancellation
            } else{
                setError(error instanceof Error ? error.message : "Something went wrong");
            }
        } finally{
            if(isActive()) {
                setIsSearching(false);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        let isActive = true;

        const loadEmployees = async () => {
            try {
                if (searchTerm.trim()) {
                    setIsSearching(true);
                } else {
                    setLoading(true);
                }

                setError(null);

                const data = await fetchEmployees(searchTerm, controller.signal);

                if(isActive) {
                    const employee = data.users.map(mapApiUserToEmployee);
                    setEmployees(employee);
                }
            } catch (error) {
                if(!isActive) return;

                if (error instanceof Error && error.name === "AbortError") {
                    //Ignore intentional cancellation
                } else {
                    setError(error instanceof Error ? error.message : "Something went wrong");
                }
            } finally {
                if(isActive) {
                    setIsSearching(false);
                    setLoading(false);
                }
            }
        };

        void loadEmployees();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [searchTerm, retryCount]);

    const handleRetry = () => {
        setRetryCount((prev) => prev + 1);
    }

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

            {isSearching && <p>Searching employees...</p>}

            {
                (employees.length === 0) ?
                (
                    <p>No employees found.</p>
                ) : (
                    employees.map((employee) => {
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