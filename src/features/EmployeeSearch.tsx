import UserCard from "../components/UserCard";
import { useState } from 'react';
const users = [
  {
    id: 1,
    name: "Ravikant",
    email: "ravikantgaud@gmail.com",
    role: "Admin",
    experience: 10,
    isActive: true
  },
  {
    id: 2,
    name: "Alex",
    email: "alex@gmail.com",
    role: "Super Admin",
    experience: 12,
    isActive: false
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    role: "User",
    experience: 15,
    isActive: true
  },
  {
    id: 4,
    name: "Leonardo",
    email: "leonardo@gmail.com",
    role: "User",
    experience: 19,
    isActive: false 
  }
]

function EmployeeSearch(){
    const [searchTerm, setSearchTerm] = useState("");
    const filteredUsers = users.filter((user) => user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    return(
        <>
        <h2>Search User</h2>
        <input type='text' value={searchTerm} placeholder='Search employee' onChange={(event) => setSearchTerm(event.target.value)} />
        <div className='filtered-users'>
            {
            filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))
            }
        </div>
      </>
    )
}

export default EmployeeSearch;