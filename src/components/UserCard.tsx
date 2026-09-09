type UserCardProps = {
    user: User;
}

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    experience: number;
    isActive: boolean;
}

function UserCard ({ user }: UserCardProps){
    return (
        <div className="user-card">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Experience: {user.experience} years</p>
            <p>{user.isActive ? "Active" : "Inactive"}</p>
        </div>
    )
}

export default UserCard;