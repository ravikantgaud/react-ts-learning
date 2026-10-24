import { useState } from "react";

type EmployeeCardProps = {
    name : string;
    department : string;
    experience: number;
    isActive: boolean;
}

function EmployeeCard({ name, department, experience, isActive }: EmployeeCardProps) {
    const [active, setActive] = useState(isActive);
    return(
        <div className="emplyee-card">
            <p>Name: {name}</p>
            <p>Department: {department}</p>
            <p>Experience: {experience} years</p>
            <p>{active ? "Active" : "Inactive"}</p>

            <button onClick={() => setActive((previous) => !previous)}>
                Toggle Status
            </button>
        </div>
    );
}

export default EmployeeCard;