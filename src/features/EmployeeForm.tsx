import { useState } from "react";
import type { FormEvent } from "react";

type Employee = {
    id: number;
    name: string;
    email: string;
    role: string;
    experience: number;
}
function EmployeeForm(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [experience, setExperience] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!name || !email || !role || !experience){
            return;
        }

        const newEmployee: Employee = {
            id: Date.now(),
            name,
            email,
            role,
            experience: Number(experience)
        }

        setEmployees((previousEmployees) => [...previousEmployees, newEmployee]);

        setName('');
        setEmail('');
        setRole('');
        setExperience('');
    }

    const handleDeleteEmployee = (id: number) => {
        setEmployees((previousEmployees) => previousEmployees.filter((employee) => employee.id !== id))
    }

    const filteredEmployees = employees.filter((employee) => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return(
        <div className="employee-container">
            <div className="employee-form">
                <h1>Add Employee Form</h1>
                <form onSubmit={handleSubmit}>
                    <p>Name: <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)} } /></p>
                    <p>Email: <input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)} }  /></p>
                    <p>Role: <input type="text" name="role" value={role} onChange={(e) => {setRole(e.target.value)}} /></p>
                    <p>Experience: <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} /></p>
                    <button type="submit">Add Employee</button>
                </form>
            </div>

            <p>Search Employee: <input type="text" placeholder="Search Employee" value={searchTerm} name="searchEmployee" onChange={(e) => setSearchTerm(e.target.value)} /> </p>
            <ul className="employee-list">
                {
                    filteredEmployees.map((employee) => (
                        <li key={employee.id}>
                            <p>Name: {employee.name}</p>
                            <p>Email: {employee.email}</p>
                            <p>Role: {employee.role}</p>
                            <p>Experience: {employee.experience}</p>
                            <p><button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button></p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default EmployeeForm;