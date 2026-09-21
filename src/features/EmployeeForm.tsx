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

    const handleSubmit = ((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!name || !email || !role || !experience) return;

        const newEmplyee: Employee = {
            id: Date.now(),
            name,
            email,
            role,
            experience: Number(experience)
        }

        setEmployees((previousEmplyee) => [...previousEmplyee, newEmplyee]);

        setName('');
        setEmail('');
        setRole('');
        setExperience('');
    });

    const handleDeleteEmployee = (id: number) => {
        setEmployees((previousEmployee) => (
            employees.filter((employee) => employee.id !== id)
        ))
    }

    const filteredEmployees = employees.filter((employee) => (
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    return(
        <div className="employee-Form">
            <form onSubmit={handleSubmit}>
                <p>Name: <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /> </p>
                <p>Email: <input type="email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> </p>
                <p>Role: <input type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} /> </p>
                <p>Experience: <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} /> </p>
                <button type="submit">Add Employee</button>
            </form>

            <p>Search Employee: <input type="text" placeholder="Search employee..." name="search-Employee" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> </p>

            <div className="employee-List">
                {
                    filteredEmployees.map((employee) => (
                        <div className="emplyee-Card" key={employee.id}>
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