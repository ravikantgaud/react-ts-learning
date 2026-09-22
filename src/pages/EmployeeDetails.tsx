import { useParams } from "react-router"

function EmployeeDetails() {
    const {id} = useParams();
    return (
        <div>
            <h1>Employee Details</h1>
            <p>Employee ID: {id}</p>
        </div>
    );
}

export default EmployeeDetails;