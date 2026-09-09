type EmployeeCardProps = {
    name : string;
    department : string;
    experience: number;
    isActive: boolean;
}

function EmployeeCard({ name, department, experience, isActive }: EmployeeCardProps) {
    return(
        <div className="emplyee-card">
            <p>Name: {name}</p>
            <p>Department: {department}</p>
            <p>Experience: {experience} years</p>
            <p>{isActive ? "Active" : "Inactive"}</p>
        </div>
    );
}

export default EmployeeCard;