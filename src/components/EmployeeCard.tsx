type EmployeeCardProps = {
    name : string;
    department : string;
    experience: number;
    isActive: boolean;
}

function EmployeeCard({name, department, experience, isActive}:EmployeeCardProps) {
    return(
        <div className="emplyeeCard">
            <p>Name: {name}</p>
            <p>Department: {department}</p>
            <p>Experience: {experience} years</p>
            <p>{isActive ? "Active" : "Deactive"}</p>
        </div>
    );
}

export default EmployeeCard;