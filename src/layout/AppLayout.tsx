import { NavLink, Outlet } from "react-router";
import Header from "../components/Header";

function AppLayout() {
    return (
        <>
            <Header title="Employee Management System" />

            <nav>
                <NavLink to="/" end>Dashboard</NavLink> | 
                <NavLink to="/employees"> Employees</NavLink> | 
                <NavLink to="/products"> Products</NavLink>
            </nav>

            <main>
                <Outlet />
            </main>
        </>
    );
}

export default AppLayout;