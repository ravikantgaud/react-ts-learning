import { useState } from "react";
import type { FormEvent } from "react";

type Employee = {
    id: number;
    name: string;
    email: string;
    role: string;
    experience: number;
}

function EmployeeForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name.trim() || !email.trim() || !role.trim() || !experience) return;

        const newEmployee: Employee = {
            id: Date.now(),
            name,
            email,
            role,
            experience: Number(experience)
        }

        setEmployees((previousEmployee) => [...previousEmployee, newEmployee]);

        setName('');
        setEmail('');
        setRole('');
        setExperience('');
    };

    const handleDeleteEmployee = (id: number) => {
        setEmployees((previousEmployees) => (
            previousEmployees.filter((employee) => employee.id !== id)
        ))
    }

    const filteredEmployees = employees.filter((employee) => (
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return(
        <div className="employee-Form">
            <form onSubmit={handleSubmit}>
                <p><label htmlFor="employee-name">Name:</label> <input id="employee-name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /> </p>
                <p><label htmlFor="employee-email">Email:</label> <input id="employee-email" type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> </p>
                <p><label htmlFor="employee-role">Role:</label> <input id="employee-role" type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} /> </p>
                <p><label htmlFor="employee-experience">Experience:</label> <input id="employee-experience" type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} /> </p>
                <button type="submit">Add Employee</button>
            </form>

            <p>Search Employee: <input type="text" placeholder="Search employee..." name="search-Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> </p>

            <div className="employee-List">
                {
                    filteredEmployees.map((employee) => (
                        <div className="employee-Card" key={employee.id}>
                            <p>{employee.name}</p>
                            <p>{employee.email}</p>
                            <p>{employee.role}</p>
                            <p>{employee.experience} years</p>
                            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default EmployeeForm;