import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"

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

function EmployeeDetails() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);

    const fetchEmployeeDetails = async (id: string): Promise<ApiUser> => {
        const response = await fetch(`https://dummyjson.com/users/${id}`)

        if(!response.ok){
            throw new Error("Failed to fetch employee details");
        }

        const data: ApiUser = await response.json();

        return data;
    }

    const mapApiUserToEmployee = (user: ApiUser): Employee => {
        return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
        }
    }

    const loadEmployeeDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            if(!id){
                setError("Employee ID is missing");
                setLoading(false);
                return;
            }

            const data = await fetchEmployeeDetails(id);

            const employeeData = mapApiUserToEmployee(data);

            setEmployeeDetails(employeeData);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleRetry = () => {
        loadEmployeeDetails();
    }

    useEffect(() => {
        loadEmployeeDetails();
    }, [id])

    if(loading){
        return "Loading employee details..."
    }

    if(error){
        return (
            <div>
                <p>{error}</p>
                <button type="button" onClick={handleRetry}>Retry</button>
            </div>
        )
    }

    if(!employeeDetails) {
        return <p>Employee details not available.</p>
    }

    return (
        <div>
            <h1>Employee Details</h1>
            <p>ID: {employeeDetails.id}</p>
            <p>Name: {employeeDetails.name}</p>
            <p>Email: {employeeDetails.email}</p>
            <p><Link to="/employees">Back to employee list</Link> </p>
        </div>
    );
}

export default EmployeeDetails;