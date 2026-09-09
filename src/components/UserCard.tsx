type UserCardProps = {
    name: string;
    email: string;
    role: string;
}

function UserCard ({name, email, role}:UserCardProps){
    return (
        <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Role: {role}</p>
        </div>
    )
}

export default UserCard;